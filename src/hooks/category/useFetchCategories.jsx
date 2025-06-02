import { useState, useEffect } from "react";

function useFetchCategories  ()  {
  // Estado para almacenar las categorías de la api
  const [categories, setCategories] = useState([]);
  //estado para saber si se estan solicitando los datos
  const [loading, setLoading] = useState(true);
  //estado para saber si hubo un error
  const [error, setError] = useState(null);
  //estado para saber si la operacion ya termino
  //sirve para no hacer rellamados

  useEffect(() => {
    const fetchCategories = async () => {
        const token = localStorage.getItem("token");
      try {
        // Se asume que el endpoint GET /api/category devuelve la lista de categorías
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category/get`,
            {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories;