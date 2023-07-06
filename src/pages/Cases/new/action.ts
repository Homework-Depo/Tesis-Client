import { redirect } from "react-router-dom";
import Error from "./model/Errors.ts";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const client = formData.get("client");
  const title = formData.get("title");
  const description = formData.get("description");
  const lawBranch = formData.get("lawBranch");
  const civilMatter = formData.get("civilMatter");
  const penalMatter = formData.get("penalMatter");
  const code = formData.get("code");
  const court = formData.get("court");
  const officer = formData.get("officer");
  const judge = formData.get("judge");
  const hasJudicialFile = formData.get("hasJudicialFile");
  const lawMatter = lawBranch === "1" ? civilMatter : penalMatter;
  const errors: Error = {};


  console.log(`client: ${client}`);
  console.log(`title: ${title}`);
  console.log(`description: ${description}`);
  console.log(`lawBranch: ${lawBranch}`);
  console.log(`civilMatter: ${civilMatter}`);
  console.log(`penalMatter: ${penalMatter}`);
  console.log(`code: ${code}`);
  console.log(`court: ${court}`);
  console.log(`officer: ${officer}`);
  console.log(`judge: ${judge}`);
  console.log(`hasJudicialFile: ${hasJudicialFile}`);


  if (!client) {
    errors.client = "Por favor selecione un cliente.";
  }

  if (!title) {
    errors.title = "Por favor ingrese un titulo.";
  }

  if (lawBranch === "0") {
    errors.lawBranch = "Por favor selecione una rama del derecho.";
  }

  if (!lawMatter) {
    errors.lawMatter = "Por favor selecione una materia del derecho.";
  }

  if (hasJudicialFile) {
    if (!code) {
      errors.code = "Por favor ingrese un Nro de expediente.";
    }

    if (!court) {
      errors.court = "Por favor ingrese el nombre del juzgado.";
    }

    if (!officer) {
      errors.officer = "Por favor ingrese el nombre del especialista legal.";
    }

    if (!judge) {
      errors.judge = "Por favor ingrese el nombre del juez.";
    }
  }

  if (Object.entries(errors).length) {
    return errors;
  }

  const response = await fetch(`${backendUrl}/cases/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      client,
      title,
      description,
      lawBranch,
      lawMatter,
      code,
      court,
      officer,
      judge,
      hasJudicialFile
    })
  });

  const data = await response.json();

  if (!data.success) {
    errors.general = "Ha ocurrido un error inesperado. Por favor, inténtalo nuevamente.";
    return errors;
  }

  return redirect("/casos");
}

export default action;