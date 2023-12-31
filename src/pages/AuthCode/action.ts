import { redirect } from "react-router-dom";
import AuthCodeForm from "./models/AuthCodeForm";
import Errors from "./models/Errors";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ request }: { request: Request }) => {
  const formData = Object.fromEntries((await request.formData()).entries()) as AuthCodeForm;
  const errors = {} as Errors;
  const authCode = formData.authCode;

  const authCodeRegex = new RegExp(/^\d{6}$/);

  if (!authCode || !authCodeRegex.test(authCode)) {
    errors.authCode = "Por favor ingrese un código de autenticación valido.";
    return errors;
  }

  const response = await fetch(`${backendUrl}/authCode`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ authCode })
  });

  const data = await response.json();

  if (!data.success) {
    errors.general = "Código de autenticación inválido. Por favor intentelo de nuevo o pongase en contacto con el administrador.";
    return errors;
  }

  return redirect("/");
}

export default action;