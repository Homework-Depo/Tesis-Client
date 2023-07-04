import { redirect } from "react-router-dom";
import Errors from "./models/Errors";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const dni = formData.get("dni") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const preStatus = formData.get("status") as string;
  const status = Number(preStatus) === 1 ? true : false;

  const errors: Errors = {};

  const namesRegex = new RegExp("^([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)(\\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)?(\\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)?$");
  const dniRegex = new RegExp("^\\d{8}$");
  const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?:\\.[a-zA-Z]{2,})?$");
  const phoneRegex = new RegExp("^\\d{9}$");

  if (!name || !namesRegex.test(name)) {
    errors.name = "Por favor, ingresa nombres válidos. Los nombres no deben contener caracteres especiales, números o símbolos.";
  }

  if (!lastName || !namesRegex.test(lastName)) {
    errors.lastName = "Por favor, ingresa apellidos válidos. Los apellidos no debe contener caracteres especiales, números o símbolos.";
  }

  if (!dni || !dniRegex.test(dni)) {
    errors.dni = "Por favor, ingresa un DNI válido.";
  }

  if (!email || !emailRegex.test(email)) {
    errors.email = "Por favor, ingresa un correo electrónico válido.";
  }

  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = "Por favor, ingresa un número de teléfono válido.";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const response = await fetch(`${backendUrl}/clients/${id}/update`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      name: name,
      status: status,
      lastName: lastName,
      dni: dni,
      email: email,
      phone: phone
    }),
  })

  const data = await response.json();

  if (!data.success) {
    errors.general = "Ha ocurrido un error al actualizar los datos del cliente. Por favor, inténtalo nuevamente."
    return errors;
  }

  return redirect(`/clientes/${id}`);
}

export default action;