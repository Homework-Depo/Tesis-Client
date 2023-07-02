/* eslint-disable no-useless-escape */
import { redirect } from "react-router-dom";
import Errors from "./models/Errors";
import { LoginForm } from "./models/LoginForm";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ request }: { request: Request }) => {
  const formData = Object.fromEntries((await request.formData()).entries()) as LoginForm;
  const errors = {} as Errors;
  const { email, password } = formData;

  const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if (!email && !password) {
    errors.general = "Por favor complete los campos.";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  if (!email || !emailRegex.test(email)) {
    errors.email = "Por favor ingrese un correo electrónico valido.";
  }

  if (!password) {
    errors.password = "Por favor ingrese una contraseña.";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const response = await fetch(`${backendUrl}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!data.success) {
    errors.general = "Credenciales inválidas. Por favor intentelo de nuevo o pongase en contacto con el administrador.";
    return errors;
  }

  if (data.authCodeRequired) {
    return redirect("/auth-code");
  }

  return redirect("/");
}

export default action;