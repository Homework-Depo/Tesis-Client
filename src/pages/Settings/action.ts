import Errors from "./models/Errors";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const authCode = formData.get("authCode") as string;
  const otpSecretKey = formData.get("otpSecretKey");
  const errors = {} as Errors;

  const response = await fetch(`${backendUrl}/settings/enable2fa`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode, otpSecretKey }),
  });

  const data = await response.json();

  if (!data.status) {
    errors.authCode = "Clave de autenticación inválida, porfavor intenta de nuevo.";
    return errors;
  }

  /* errors.success = "2FA ha sido habilitado exitosamente."; */
  return errors;
}

export default action;