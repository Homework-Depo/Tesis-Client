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

  if (lawBranch === "1" && !civilMatter) {
    errors.civilMatter = "Por favor selecione una materia civil.";
  }

  if (lawBranch === "2" && !penalMatter) {
    errors.penalMatter = "Por favor selecione una materia penal.";
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

  return null;
}

export default action;