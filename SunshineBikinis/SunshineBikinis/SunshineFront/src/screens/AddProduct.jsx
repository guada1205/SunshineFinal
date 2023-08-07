import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addProduct.css";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(); // Usamos un estado para la imagen

  const categorias = ["Bikinis", "Trikinis", "Enterizas", "Vintage"];
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();
  //#region "props"
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handlePrecioCompraChange = (event) => {
    setPrecioCompra(event.target.value);
  };

  const handlePrecioVentaChange = (event) => {
    setPrecioVenta(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleImagenChange = (event) => {
    setThumbnail(event.target.files[0]);
  };
  //#endregion

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("codigo_Producto", codigo);
    formData.append("nombre_Producto", nombre);
    formData.append("descripcion_Producto", descripcion);
    formData.append("categoria_Producto", categoria);
    formData.append("precioCompra_Producto", precioCompra);
    formData.append("precioVenta_Producto", precioVenta);
    formData.append("StockProducto", stock);
    formData.append("thumbnail", thumbnail);

    await axios
      .post("http://127.0.0.1:3000/api/productos", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    navigate("/productos");
  };

  return (
    <div className="form-container">
      <div className="product-detail-header">
        <Link to="/MainAdminPage" className="oButton">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <h1>Agregar Producto</h1>
        <label>
          Codigo:
          <input type="text" value={codigo} onChange={handleCodigoChange} />
        </label>

        <label>
          Nombre:
          <input type="text" value={nombre} onChange={handleNombreChange} />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={handleDescripcionChange}
          />
        </label>
        <label>
          Categoría:
          <select value={categoria} onChange={handleCategoriaChange}>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Precio Compra:
          <input
            type="number"
            value={precioCompra}
            onChange={handlePrecioCompraChange}
          />
        </label>
        <label>
          Precio Venta:
          <input
            type="number"
            value={precioVenta}
            onChange={handlePrecioVentaChange}
          />
        </label>

        <label>
          Stock:
          <input type="number" value={stock} onChange={handleStockChange} />
        </label>

        <label>
          Imagen de Portada:
          <input type="file" onChange={handleImagenChange} />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;
