import { useState } from "react";

function useFetchUser() {
  const [error, setError] = useState();
  const [done, setDone] = useState();
  const initialUrl = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    try {
      const response = await fetch(`${initialUrl}/user/get`);
      if (response.ok) {
        const users = await response.json();
        // Confirmación de finalización de la operación
        setDone(true);
        return users;
      } else {
        setError(response.statusText);
        setDone(false);
        // Retorna un array vacío si no hay usuarios
        return [];
      }
    } catch (error) {
      setError(error);
    }
  };

  // Permite volver a intentar la petición en caso de error
  const reFetch = async () => {
    setDone(false);
    setError(null);
    await fetchUser();
  };
  return { fetchUser, error, done, reFetch };
}

export default useFetchUser;
