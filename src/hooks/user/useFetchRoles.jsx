import { useState } from "react";

function useFetchRoles() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [roles, setRoles] = useState([]);
  const initialUrl = `${import.meta.env.VITE_API_URL}user/roles`;

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    setDone(false);
    try {
      const response = await fetch(initialUrl);
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
        setDone(true);
        localStorage.setItem("roles", JSON.stringify(data));
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchRoles, error, loading, done, roles };
}

export default useFetchRoles;