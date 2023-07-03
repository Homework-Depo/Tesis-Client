import { Params } from "react-router-dom";
import accessRouteProtection from "../../../utils/accessRouteProtection";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ params }: { params: Params }) => {
/*   await accessRouteProtection();
 */
  const { id } = params;

  const response = await fetch(`${backendUrl}/clients/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log(data);

  return data.data;
}

export default action;