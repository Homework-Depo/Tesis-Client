import { useState, useRef, useEffect } from "react";
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
  FormHelperText,
  OutlinedInput,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Link, Form, useSubmit, useActionData, useParams, useLoaderData } from "react-router-dom";
import Errors from "./models/Errors";
import Client from "./models/Client";

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
        ¿Estás seguro de que deseas actualizar los datos de este cliente?
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

export default function UpdateClient() {
  const submit = useSubmit();
  const formRef = useRef(null);
  const errors = useActionData() as Errors;
  const params = useParams();
  const loaderData = useLoaderData() as Client;

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
    submit(formRef.current);
  }

  return (
    <Paper elevation={3}>
      <Box sx={{ padding: 2 }}>
        <Typography marginBottom={3} variant="h5" fontWeight={500}>Editar Datos del Cliente</Typography>
        <Form noValidate autoComplete="off" method="put" ref={formRef}>

          <Stack spacing={3}>
            <input type="hidden" name="id" value={params.id} />
            <FormControl>
              <InputLabel id="statusLabel">Estado</InputLabel>
              <Select
                labelId="statusLabel"
                id="status"
                defaultValue={loaderData?.status ? 1 : 0}
                name="status"
                label="Estado"
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">Nombres</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                label="Nombres"
                defaultValue={loaderData?.name}
              />
              {errors?.name && <FormHelperText error>{errors.name}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Apellidos</InputLabel>
              <OutlinedInput
                id="lastName"
                name="lastName"
                label="Apellidos"
                defaultValue={loaderData?.lastName}
              />
              {errors?.lastName && <FormHelperText error>{errors.lastName}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="dni">DNI</InputLabel>
              <OutlinedInput
                id="dni"
                name="dni"
                label="DNI"
                defaultValue={loaderData?.dni}
                inputProps={{ maxLength: 8 }}
              />
              {errors?.dni && <FormHelperText error>{errors.dni}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="phone">Teléfono</InputLabel>
              <OutlinedInput
                id="phone"
                name="phone"
                label="Teléfono"
                defaultValue={loaderData?.phone}
                inputProps={{ maxLength: 9 }}
              />
              {errors?.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                defaultValue={loaderData?.email}
                label="Correo Electrónico"
              />
              {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </FormControl>
            {errors?.general &&
              <FormHelperText
                sx={{ textAlign: "center", fontWeight: 500 }}
                error>{errors.general}
              </FormHelperText>}
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1}
            >
              <Button
                component={Link}
                to={`/clientes/${params.id}/`}
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