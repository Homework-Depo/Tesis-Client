import accessRouteProtection from "../../utils/accessRouteProtection";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loader = async () => {
  await accessRouteProtection();

  const activeCasesResponse = await fetch(`${backendUrl}/main/`, {
    method: "GET",
    credentials: "include",
  });

  const activeCasesData = await activeCasesResponse.json();
  console.log(activeCasesData.data);

  return {
    activeCases: activeCasesData.data.activeCases,
    favoriteFiles: activeCasesData.data.favoriteFiles
  };
}

export default loader;