import { VisibilityOff, Visibility, Send } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import { Box, Card, Collapse, CardHeader, CardContent, Stack, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText, IconButton, CardActions } from "@mui/material";
import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Errors from "./models/Errors";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const errors = useActionData() as Errors;

  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" || navigation.state === "submitting" ? true : false;

  const handleClickShowPassword = () => { setShowPassword((show) => !show) };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { sm: 'center', xs: 'start' },
        height: '100dvh',
        paddingTop: { sm: 0, xs: 2 },
        paddingX: { sm: 0, xs: 2 },
        backgroundColor: 'background.default'
      }}
    >
      <Card
        sx={{
          width: 450,
          minWidth: 250
        }}
        elevation={5}
      >
        <Collapse in appear>
          <CardHeader
            title="Ingresar"
            subheader="Entra las credenciales proveídas por el administrador."
          />
          <Form method="POST" noValidate>
            <CardContent>
              <Stack spacing={2}>
                <FormControl>
                  <InputLabel required htmlFor="email">Correo Electrónico</InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    label="Correo Electrónico*"
                    endAdornment={
                      <InputAdornment position='end'>
                        <EmailIcon />
                      </InputAdornment>
                    }
                  />
                  {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl>
                  <InputLabel required htmlFor="password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Contraseña*"
                    endAdornment={
                      <InputAdornment sx={{ paddingRight: 0.5 }} position='end'>
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors?.password && <FormHelperText error>{errors.password}</FormHelperText>}
                </FormControl>
                {errors?.general && <FormHelperText sx={{ textAlign: "center" }} error>{errors.general}</FormHelperText>}
              </Stack>
            </CardContent>
            <CardActions>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                type="submit"
                endIcon={<Send />}
              >
                Ingresar
              </LoadingButton>
            </CardActions>
          </Form>
        </Collapse>
      </Card>
    </Box>
  );
}