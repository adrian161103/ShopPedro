// Ejemplo con React para enviar el formulario con imagen y mostrar profiRate y vista previa
import useCreateProducts from "../../hooks/product/useCreateProducts.jsx"; // Ajusta la ruta según tu estructura
import useFetchCategories from "../../hooks/category/useFetchCategories.jsx";
import useFetchStatus from "../../hooks/product/useFetchStatus.jsx";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import useEditProduct from "../../hooks/product/useEditProduct.jsx";
import { statusTranslate } from "./statusTranslate.js";

function CreateProduct({ productToEdit, onEditComplete  }) {
  const { editProduct } = useEditProduct();

  const {
    product,
    setProduct,
    price,
    setPrice,    // Agregado el setPrice
    stock,
    category,
    image,
    imagePreview,
    message,
    setImage,
    setImagePreview,
    handleChange,
    handlePriceChange,
    handleFileChange,
    handleSubmit: handleCreateSubmit,
    setStock,
    setCategory,
  } = useCreateProducts();

  useEffect(() => {
    if (productToEdit) {
      // Sincronizamos los estados del formulario con los valores a editar
      setProduct(productToEdit);
      setCategory(typeof productToEdit.category === "object"
        ? productToEdit.category._id
        : productToEdit.category || ""
    );
      setStock(productToEdit.stock || 0);
      setPrice({
        amount: productToEdit.price?.amount || 0,
        currency: productToEdit.price?.currency || "",
      });
      if (productToEdit.imageUrl) {
        const normalizedUrl = productToEdit.imageUrl.replace(/\\/g, "/");
        setImagePreview(normalizedUrl);
        setImage(null);
        }
    }
  }, [productToEdit, setProduct, setCategory, setStock, setPrice, setImagePreview, setImage]);

  const { categories, loading: loadingCategories, error: errorCategories } = useFetchCategories();
  const { status, loadingStatus, errorStatus } = useFetchStatus();

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    // Incluye la imagen junto con los demás datos
    const data = {
      ...product,
      price,
      stock,
      category,
      image,
      status: product.status, // Se utiliza product.status ya que es parte del objeto product
    };

    const updated = await editProduct(productToEdit._id, data);
    if (updated) {
      // Aviso al padre que ya terminé:
      if (onEditComplete) onEditComplete(updated);
    } else {
      // Eliminado console.log innecesario
    }
  };

  return (
    <>
      <div className="upload-container">
        <h2>{productToEdit ? "Editar Producto" : "Crear Producto"}</h2>
        {message && <p>{message}</p>}
        <form
          onSubmit={productToEdit ? handleSubmitEdit : handleCreateSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Descripción:
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Estado:
              {loadingStatus ? (
                <p>Cargando estados...</p>
              ) : errorStatus ? (
                <p>Error al cargar los estados: {errorStatus}</p>
              ) : (
                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione estado</option>
                  {status.map((state) => (
                    <option key={state} value={state}>
                      {statusTranslate[state] || state}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
          <div>
            <label>
              Profit Rate:
              <input
                type="number"
                step="0.01"
                name="profiRate"
                value={product.profiRate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Highlighted:
              <input
                type="checkbox"
                name="highlighted"
                checked={product.highlighted}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Monto:
              <input
                type="number"
                name="amount"
                value={price.amount}
                onChange={handlePriceChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Moneda:
              <select
                name="currency"
                value={price.currency}
                onChange={handlePriceChange}
                required
              >
                <option value="">Seleccione moneda</option>
                <option value="USD">USD</option>
                <option value="PESOS">PESOS</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Stock:
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Categoría:
              {loadingCategories ? (
                <p>Cargando categorías...</p>
              ) : errorCategories ? (
                <p>Error al cargar las categorías: {errorCategories}</p>
              ) : (
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Seleccione categoría</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
          <div>
            <label>
              Imagen:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          {imagePreview && (
            <div>
              <p>Vista previa de la imagen seleccionada:</p>
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
          <button type="submit">
            {productToEdit ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </form>
      </div>
    </>
  );
}
CreateProduct.propTypes = {
  productToEdit: PropTypes.object,
  onEditComplete: PropTypes.func,
};

export default CreateProduct;