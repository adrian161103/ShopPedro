import { useState } from "react";

function useEditProduct() {
  const [error, setError] = useState(null);

  const editProduct = async (id, data) => {
    const token = localStorage.getItem("token");

    // Construimos el FormData a partir del objeto data
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          // No incluyas "Content-Type" cuando envías FormData
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return true;
      } else {
        const responseData = await response.json();
        setError(responseData.message || response.statusText);
        return false;
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
      setError(error.message);
      return false;
    }
  };

  return { error, editProduct };
}

export default useEditProduct;