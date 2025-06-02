import { useState, useEffect } from "react";

const useFetchStatus = () => {
  const [status, setstatus] = useState([]);
  const [loadingStatus, setLoading] = useState(true);
  const [errorStatus, setError] = useState(null);

  const FetchStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await response.json();
      setstatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchStatus();
  }, []);

  return { FetchStatus, status, loadingStatus, errorStatus };
};

export default useFetchStatus;