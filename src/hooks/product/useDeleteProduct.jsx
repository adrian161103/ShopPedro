import { useState } from 'react';

function useDeleteProduct() {
  const [errorD, setError] = useState(null);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { deleteProduct, errorD };
}

export default useDeleteProduct;