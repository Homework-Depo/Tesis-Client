import { redirect } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const multipleFiles = formData.getAll("files") as File[];
  const caseId = formData.get("caseId") as string;
  const files = new FormData();

  multipleFiles.forEach((file: File) => {
    files.append("files", file);
  });

  await fetch(`${backendUrl}/cases/${caseId}/files/upload`, {
    method: "POST",
    credentials: "include",
    body: files
  });

  /* const data = await response.json(); */

  return redirect(`/casos/${caseId}`);
}

export default action;