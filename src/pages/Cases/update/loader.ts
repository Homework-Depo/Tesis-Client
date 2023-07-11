const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const loader = async ({ request }: { request: Request }) => {
  const clientId = new URL(request.url).searchParams.get('clientId');

  if (clientId) {
    const response = await fetch(`${backendUrl}/cases/create?clientId=${clientId}`, {
      method: "GET",
      credentials: "include"
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      return [...data.data];
    }
  } else {
    const response = await fetch(`${backendUrl}/cases/create`, {
      method: "GET",
      credentials: "include"
    });

    const data = await response.json();

    if (data.success) {
      return [...data.data];
    }
  }
  return null;
}

export default loader;