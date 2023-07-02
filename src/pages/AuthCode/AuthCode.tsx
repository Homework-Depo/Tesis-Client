import { Box, Card, Collapse, CardHeader, CardContent, Stack, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText, CardActions, Button } from "@mui/material";
import { useActionData, Form } from "react-router-dom";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Errors from "./models/Errors";

export default function AuthCode() {
  const errors = useActionData() as Errors;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { sm: 'center', xs: 'start' },
        height: '100dvh',
        paddingTop: { sm: 0, xs: 2 },
        paddingX: { sm: 0, xs: 2 }
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
            title="Verifica tu Identidad"
            subheader="Por favor, ingresa el código de verificación enviado a tu dispositivo registrado."
          />
          <Form method="POST" noValidate>
            <CardContent>
              <Stack spacing={2}>
                <FormControl>
                  <InputLabel htmlFor="authCode">Código de Autenticación</InputLabel>
                  <OutlinedInput
                    id="authCode"
                    name="authCode"
                    label="Código de Autenticación"
                    type='text'
                    endAdornment={
                      <InputAdornment position="end">
                        <VpnKeyIcon />
                      </InputAdornment>
                    }
                  />
                  {errors?.authCode && <FormHelperText error>{errors.authCode}</FormHelperText>}
                </FormControl>
                {errors?.general && <FormHelperText sx={{ textAlign: "center" }} error>{errors.general}</FormHelperText>}
              </Stack>
            </CardContent>
            <CardActions>
              <Button variant="contained" type="submit">Ingresar</Button>
            </CardActions>
          </Form>
        </Collapse>
      </Card>
    </Box>
  );
}