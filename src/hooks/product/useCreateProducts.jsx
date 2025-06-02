import { useState } from "react";

const useCreateProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    status: "",
    profiRate: 1,
    highlighted: false,
  });
  const [price, setPrice] = useState({ amount: 0, currency: "" });
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["name", "description", "status", "profiRate", "highlighted"].includes(name)) {
      setProduct((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("status", product.status);
    formData.append("profiRate", product.profiRate);
    formData.append("highlighted", product.highlighted);
    formData.append("price[amount]", price.amount);
    formData.append("price[currency]", price.currency);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "No se pudo crear el producto"}`);
        return;
      }
      setMessage("Producto creado exitosamente");
    } catch {
      setMessage("Error al crear el producto");
    }
  };

  return {
    product, setProduct,
    price, setPrice,
    stock, setStock,
    category, setCategory,
    image, setImage,
    imagePreview, setImagePreview,
    message,
    handleChange,
    handlePriceChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useCreateProducts;