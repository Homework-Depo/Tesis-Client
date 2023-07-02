import accessRouteProtection from "../../../utils/accessRouteProtection";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loader = async () => {
  await accessRouteProtection();

  const response = await fetch(`${backendUrl}/clients`, {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();

  return data.data;
}

export default loader;