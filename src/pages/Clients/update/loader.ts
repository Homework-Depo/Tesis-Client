import { Params } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const action = async ({ params }: { params: Params }) => {

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