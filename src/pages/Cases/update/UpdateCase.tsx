import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Switch,
  Collapse,
  FormHelperText,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Link, Form, useSubmit, useActionData, useLoaderData, useSearchParams } from "react-router-dom";
import Errors from "./model/Errors"
import Client from "./model/Client";
import LawMatter from "./model/LawMatter";

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  onSubmit: () => void; // Add onSubmit prop
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, onSubmit, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSubmit(); // Call the onSubmit function
    onClose(value);
  };

  /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  }; */

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Confirmar Acción</DialogTitle>
      <DialogContent dividers>
        ¿Estás seguro de que deseas crear un nuevo cliente?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" autoFocus onClick={handleCancel}>
          No
        </Button>
        <Button variant="outlined" color="primary" onClick={handleOk}>Si</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function UpdateCase() {
  const submit = useSubmit();
  const formRef = useRef(null);
  const loaderData = useLoaderData() as [Client[], LawMatter[]];
  const clients = loaderData[0];
  const lawMatters = loaderData[1];
  const civilMatters = lawMatters.filter(lawMatter => lawMatter.lawBranchId === 1);
  const penalMatters = lawMatters.filter(lawMatter => lawMatter.lawBranchId === 2);
  const errors = useActionData() as Errors;
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("clientId");

  /* Confirmation Dialog Controls - Start */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  /* Confirmation Dialog Controls - End */

  const handleSubmit = () => {
    // add fields to formRef.current 
    //
    submit(formRef.current);
  }

  // AutoComplete - Start
  const [selectClientId, setSelectedClientId] = useState<Client | null>(null);
  const [selectedCivilMatter, setSelectedCivilMatter] = useState<LawMatter | null>(null);
  const [selectedPenalMatter, setSelectedPenalMatter] = useState<LawMatter | null>(null);

  const handleChange = (_: ChangeEvent<unknown>, newValue: Client | null) => {
    setSelectedClientId(newValue);
  };

  const handleCivilMatterChange = (_: ChangeEvent<unknown>, newValue: LawMatter | null) => {
    setSelectedCivilMatter(newValue);
  };

  const handlePenalMatterChange = (_: ChangeEvent<unknown>, newValue: LawMatter | null) => {
    setSelectedPenalMatter(newValue);
  };
  // AutoComplete - End

  // Switch - Start
  const [checked, setChecked] = useState(false);
  const handleSwitchChange = (_: ChangeEvent, newValue: boolean) => {
    setChecked(newValue);
  };

  // LawBranch Select - Start
  const [lawBranch, setLawBranch] = useState(0);
  const handleLawBranchChange = (event: any) => {
    setLawBranch(event.target.value);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ padding: 2 }}>
        <Typography marginBottom={3} variant="h6" fontWeight={500}>Cliente</Typography>
        <Form noValidate autoComplete="off" method="post" ref={formRef}>
          <Stack spacing={2}>
            {clients.length > 1 ? (
              <>
                <Autocomplete
                  options={clients}
                  getOptionLabel={(client) => `${client.name} ${client.lastName} (${client.id})`}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  value={selectClientId}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors?.client ? true : false}
                      helperText={errors?.client}
                      label="Cliente"
                      variant="outlined"
                      required />
                  )}
                />
                <input type="hidden" name="client" value={selectClientId?.id || ""} onChange={e => e.currentTarget.value = String(selectClientId?.id)} />
              </>
            ) : (
              <>
                <TextField
                  label={`${clients[0].name} ${clients[0].lastName} (${clients[0].id})`}
                  disabled
                />
                <input type="hidden" name="client" value={clients[0].id} />
              </>
            )}

            <Typography marginBottom={3} variant="h6" fontWeight={500}>Información Basica</Typography>
            <TextField
              id="title"
              name="title"
              label="Título"
              error={errors?.title ? true : false}
              helperText={errors?.title}
              defaultValue={clients[0].name}
              required
            />
            <TextField
              id="description"
              name="description"
              label="Descripción"
              error={errors?.description ? true : false}
              helperText={errors?.description}
              multiline
              rows={4}
            />
            <Typography marginBottom={3} variant="h6" fontWeight={500}>Información Legal</Typography>
            <FormControl required>
              <InputLabel id="lawBranch-label" error={errors?.lawBranch ? true : false}>Rama Legal</InputLabel>
              <Select
                labelId="lawBranch-label"
                id="lawBranch"
                label="Rama Legal"
                name="lawBranch"
                error={errors?.lawBranch ? true : false}
                value={lawBranch}
                onChange={handleLawBranchChange}
              >
                <MenuItem value={0} disabled></MenuItem>
                <MenuItem value={1}>Civil</MenuItem>
                <MenuItem value={2}>Penal</MenuItem>
              </Select>
              <FormHelperText error={errors?.lawBranch ? true : false}>{errors?.lawBranch}</FormHelperText>
            </FormControl>
            <FormControl required>
              <Autocomplete
                sx={{ display: lawBranch === 1 ? 'block' : 'none' }}
                id="civilMatters"
                options={civilMatters}
                getOptionLabel={(lawMatter) => `${lawMatter.name}`}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                value={selectedCivilMatter}
                onChange={handleCivilMatterChange}
                renderInput={(params) => (
                  <TextField {...params}
                    error={errors?.lawMatter ? true : false}
                    helperText={errors?.lawMatter}
                    label="Materia Civil"
                    variant="outlined"
                    required />
                )}
              />
              <input type="hidden" name="civilMatter" value={selectedCivilMatter?.id || ""} onChange={e => e.currentTarget.value = String(selectedCivilMatter?.id)} />
              <Autocomplete
                sx={{ display: lawBranch === 2 ? 'block' : 'none' }}
                id="penalMatters"
                options={penalMatters}
                getOptionLabel={(lawMatter) => `${lawMatter.name}`}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                value={selectedPenalMatter}
                onChange={handlePenalMatterChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Materia Penal"
                    variant="outlined"
                    required
                    error={errors?.lawMatter ? true : false}
                    helperText={errors?.lawMatter}
                  />
                )}
              />
              <input type="hidden" name="penalMatter" value={selectedPenalMatter?.id || ""} onChange={e => e.currentTarget.value = String(selectedPenalMatter?.id)} />
            </FormControl>
            <Box display={"flex"} flexWrap={"wrap"} gap={1}>
              <Typography variant="h6" fontWeight={500}>Expediente Judicial</Typography>
              <Switch
                name="hasJudicialFile"
                id="hasJudicialFile"
                value={checked}
                checked={checked}
                onChange={handleSwitchChange}
              />
            </Box>
            <Box>
              <Collapse in={checked}>
                <Stack spacing={2}>
                  <TextField
                    id="code"
                    name="code"
                    label="Nro. de Expediente"
                    error={errors?.code ? true : false}
                    helperText={errors?.code}
                    required
                    disabled={!checked}
                  />
                  <TextField
                    id="court"
                    name="court"
                    label="Juzgado"
                    error={errors?.court ? true : false}
                    helperText={errors?.court}
                    required
                    disabled={!checked}
                  />
                  <TextField
                    id="officer"
                    name="officer"
                    label="Especialista Legal"
                    error={errors?.officer ? true : false}
                    helperText={errors?.officer}
                    required
                    disabled={!checked}
                  />
                  <TextField
                    id="judge"
                    name="judge"
                    label="Juez"
                    error={errors?.judge ? true : false}
                    helperText={errors?.judge}
                    required
                    disabled={!checked}
                  />
                </Stack>
              </Collapse>
              {errors?.general && <FormHelperText sx={{ textAlign: "center" }} error={true}>{errors.general}</FormHelperText>}
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1}
            >
              <Button
                component={Link}
                to={clientId ? `/clientes/${clientId}` : "/clientes"}
                startIcon={<CloseIcon />}
                variant="contained"
                color="inherit"
              >
                Cancelar
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                color="primary"
                onClick={handleClickListItem}
              >
                Guardar
              </Button>
            </Box>
          </Stack>
        </Form>
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit} // Pass the handleSubmit function
          value={value}
        />
      </Box>
    </Paper>
  );
}