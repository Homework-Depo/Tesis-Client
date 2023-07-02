import { redirect } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loader = async () => {

  const response = await fetch(`${backendUrl}/session/`, {
    method: "POST",
    credentials: "include"
  });

  const data = await response.json();
  
  if (data.tokenType !== "none" && data.tokenType !== "auth") {
    return redirect("/");
  }

  return null;
}

export default loader;