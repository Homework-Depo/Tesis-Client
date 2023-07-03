import accessRouteProtection from "../../utils/accessRouteProtection";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loader = async () => {
/*   await accessRouteProtection();
 */
  const response = await fetch(`${backendUrl}/settings`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export default loader;