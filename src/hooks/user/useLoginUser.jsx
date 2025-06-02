import { useState } from "react";
import { useAuth } from "../../auth/authprovider"; // Asegúrate de la ruta correcta

function useLoginUser() {
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Usamos el contexto para actualizar el estado global
  const initialUrl = import.meta.env.VITE_API_URL;

  const loginUser = async (formData) => {
    try {
      const response = await fetch(`${initialUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setError(null);
        login(data.token, data.role); // Ahora actualiza el estado global en AuthProvider
        console.log("¡Logged in!");
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || response.statusText);
        return false;
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
      setError(error.message);
      return false;
    }
  };

  return { loginUser, error };
}

export default useLoginUser;