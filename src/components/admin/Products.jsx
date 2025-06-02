import useFetchProducts from "../../hooks/product/useFetchProduct.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useDeleteProduct from "../../hooks/product/useDeleteProduct.jsx";
import { useCallback, useState } from "react";
import CreateProduct from "../../components/Products/CreateProduct.jsx";
import { statusTranslate } from "../../components/Products/statusTranslate.js";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Aplica un retardo entre cada tarjeta
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function Products() {
  const navigate = useNavigate();
  const { fetchProducts, products, loading, error } = useFetchProducts();
  const fetchProductsCallback = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  const [editingProduct, setEditingProduct] = useState(null);

  const { deleteProduct, errorD } = useDeleteProduct();

  if (loading) return <p>Cargando productos...</p>;
  if (error) {
    // Redirige en caso de error (por ejemplo, falta de autorización)
    navigate("/login");
    return <p>Error: {error}</p>;
  }

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await fetchProductsCallback();
  };

  const handleEdit = (prod) => {
    setEditingProduct(prod);
  };
  const handleEditComplete = async () => {
    setEditingProduct(null); // Cierra el formulario de edición
    await fetchProductsCallback(); // Actualiza la lista de productos
  };
  return (
    <>
      <div
        style={{
          padding: "2rem",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Lista de Productos
        </h2>

        {editingProduct && (
          <CreateProduct
            productToEdit={editingProduct}
            onEditComplete={handleEditComplete}
          />
        )}

        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>No hay productos disponibles.</p>
        ) : (
          <motion.div
            className="product-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((prod) => (
              <motion.div
                key={prod._id}
                className="product-card"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }} // Animación al pasar el mouse
                style={{
                  border: "1px solid ",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 8px ",
                }}
              >
                <h3 style={{ marginBottom: "1rem" }}>{prod.name}</h3>
                {prod.imageUrl && (
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <p>
                  <strong>Descripción:</strong> {prod.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {statusTranslate[prod.status] || prod.status}
                </p>
                <p>
                  <strong>Precio:</strong> {prod.price.amount}{" "}
                  {prod.price.currency}
                </p>
                <p>
                  <strong>Profit Rate:</strong> {prod.profiRate}
                </p>
                <p>
                  <strong>Precio con Margen:</strong> {prod.priceWithProfiRate}
                </p>
                <p>
                  <strong>Highlighted:</strong> {prod.highlighted ? "Sí" : "No"}
                </p>
                <p>
                  <strong>Stock:</strong> {prod.stock}
                </p>
                {prod.category && (
                  <p>
                    <strong>Categoría:</strong>{" "}
                    {typeof prod.category === "object"
                      ? prod.category.name
                      : prod.category}
                  </p>
                )}
                <p>
                  <strong>Fecha de Creación:</strong>{" "}
                  {new Date(prod.creationDate).toLocaleString()}
                </p>
                <button
                  onClick={() => handleEdit(prod)}
                  style={{ border: "2px black solid" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  style={{ border: "2px black solid" }}
                >
                  Eliminar
                </button>
              </motion.div>
            ))}
            {errorD && <p>{errorD}</p>}
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Products;
