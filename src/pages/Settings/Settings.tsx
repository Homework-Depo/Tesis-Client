import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Paper } from '@mui/material';
import QRCode from 'react-qr-code';
import { useLoaderData, useNavigate, Form, useActionData } from 'react-router-dom';
import UserSettings from './models/UserSettings';
import Errors from './models/Errors';
import { Send } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings() {

  const [value, setValue] = useState(0);

  const response = useLoaderData() as UserSettings;
  console.log(response);
  
  const navigate = useNavigate();
  const errors = useActionData() as Errors;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDisable2fa = async () => {
    const response = await fetch("http://localhost:3000/settings/disable2fa", {
      method: "POST",
      credentials: "include"
    });

    const data = await response.json();

    if (data.status === "success") {
      navigate("/configuracion", { replace: true });
    }

    return;
  }

  return (
    <Box sx={{ width: "auto" }}>
      <Paper elevation={3}>
        {/* {errors?.success && <Alert variant="filled" severity="success">{errors.success}</Alert>} */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="SEGURIDAD" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                sm: 1,
                md: 550
              },
              gap: 2,
              textAlign: 'justify'
            }}
          >
            <Box
              sx={{
                display: 'inline',
                textAlign: 'left',
              }}
            >
              <Typography component={"span"} fontWeight={500}>{"Autenticación en dos pasos: ".toUpperCase()}</Typography>
              <Typography
                component={"span"}
                fontWeight={500}
                color={response.is2FAEnabled ? "success.main" : "error"}
              >
                {response.is2FAEnabled ? "ACTIVADO" : "DESACTIVADO"}
              </Typography>
            </Box>
            {!response.is2FAEnabled ?
              <>
                Las aplicaciones de autenticación y las extensiones de navegador como 1Password, Authy, Microsoft Authenticator,
                etc. generan contraseñas de un solo uso que se utilizan como un segundo factor para verificar su identidad cuando se le solicita
                durante el inicio de sesión.

                <Typography fontWeight={500}>1. ESCANEA EL CÓDIGO QR  O INGRESA EL CÓDIGO EN TU APLICATIVO</Typography>

                <Box
                  sx={{
                    height: 250,
                    width: "auto"
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: 250, maxWidth: "100%", width: "auto" }}
                    value={response.otpKeyUri || ''}
                    viewBox={`0 0 256 256`}
                  />
                </Box>
                <Typography>{response.otpSecretKey}</Typography>
                <Typography fontWeight={500}>2. CONFIRMA LA CLAVE DE 6 DIGITOS</Typography>
                <Form method="POST" autoComplete="off">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 1,
                      gap: 2
                    }}
                  >
                    <FormControl>
                      <InputLabel htmlFor="authCode">Verifica el código de la aplicación</InputLabel>
                      <OutlinedInput
                        id="authCode"
                        name="authCode"
                        type="text"
                        label="Verifica el código de la aplicación"
                        endAdornment={
                          <InputAdornment position="end">
                            <VpnKeyIcon />
                          </InputAdornment>
                        }
                      />
                      {errors?.authCode && <FormHelperText error>{errors.authCode}</FormHelperText>}
                    </FormControl>
                    <input type="hidden" name="otpSecretKey" value={response.otpSecretKey} />
                    <Box><Button variant='contained' type="submit" startIcon={<Send />}>CONFIRMAR</Button></Box>
                  </Box>
                </Form>
              </> : <>
                <div>
                  <Button variant="contained" onClick={handleDisable2fa}>DESACTIVAR AUTENTICACIÓN EN DOS PASOS</Button>
                </div>
              </>}
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}