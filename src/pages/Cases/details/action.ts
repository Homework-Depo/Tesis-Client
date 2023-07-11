import { redirect } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const multipleFiles = formData.getAll("files") as File[];
  const caseId = formData.get("caseId") as string;
  const files = new FormData();
  const intent = formData.get("intent") as string;
  const selectedFileId = formData.get("selectedFileId");

  if (intent === "upload") {
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

  if (intent === "toggleFavorite") {
    const response = await fetch(`${backendUrl}/files/${selectedFileId}/favorite`, {
      method: "POST",
      credentials: "include",
    })

    if (response.ok) {
      const file = await response.json();
    }
  }

}

export default action;