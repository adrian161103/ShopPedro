import { useState } from "react";

function useFetchRoles() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [roles, setRoles] = useState([]);
  
  // Asegúrate de que el endpoint es correcto, por ejemplo, `/user/roles`
  const initialUrl = `${import.meta.env.VITE_API_URL}user/roles`;

  const fetchRoles = async () => {
    // Reinicia los estados antes de iniciar la petición
    setLoading(true);
    setError(null);
    setDone(false);

    try {
      const response = await fetch(initialUrl);

      if (response.ok) {
        const data = await response.json();
        setRoles(data);
        setDone(true);
        // Guarda los roles en local storage (es importante parsear el objeto a una cadena JSON)
        localStorage.setItem("roles", JSON.stringify(data));
      } else {
        console.error(response.statusText);
        setError(response.statusText);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchRoles, error, loading, done, roles };
}

export default useFetchRoles;