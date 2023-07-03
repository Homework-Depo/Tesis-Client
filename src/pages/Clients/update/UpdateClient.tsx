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
import loader from "../list/loader";

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

  const [status, setStatus] = useState(false);

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

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  }
  return (
    <Paper elevation={3}>
      <Box sx={{ padding: 2 }}>
        <Typography marginBottom={3} variant="h5" fontWeight={500}>Editar Datos del Cliente</Typography>
        <Form noValidate autoComplete="off" method="post" ref={formRef}>

          <Stack spacing={3}>
            <FormControl>
              <InputLabel htmlFor="status">Estado</InputLabel>
              <Select
                id="status"
                name="status"
                label="Estado"
                value={status}
                onChange={handleStatusChange}
              >
                {/* <option value={1}>Activo</option>
                <option value={0}>Inactivo</option> */}
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={2}>Inactive</MenuItem>
                <MenuItem selected></MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">Nombres</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                label="Nombres"
                value={loaderData?.name}
              />
              {errors?.name && <FormHelperText error>{errors.name}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Apellidos</InputLabel>
              <OutlinedInput
                id="lastName"
                name="lastName"
                label="Apellidos"
                value={loaderData?.lastName}
              />
              {errors?.lastName && <FormHelperText error>{errors.lastName}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="dni">DNI</InputLabel>
              <OutlinedInput
                id="dni"
                name="dni"
                label="DNI"
                value={loaderData?.dni}
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
                value={loaderData?.phone}
                inputProps={{ maxLength: 9 }}
              />
              {errors?.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                value={loaderData?.email}
                label="Correo Electrónico"
              />
              {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </FormControl>
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