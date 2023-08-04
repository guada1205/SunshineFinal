import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./addProduct.css";

const EditProduct = ({ navigate }) => {
  //#region "props"

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(null); // Usamos un estado para la imagen

  const categorias = ["Bikinis", "Trikinis"];
  const [categoria, setCategoria] = useState("");

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
    // Manejo de cambios en la imagen, aquí podrías cargarla en un estado o hacer otras acciones
  };
  //#endregion
  const { id } = useParams();
  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/productos/${id}`
      );
      setNombre(data[0].nombre_Producto);
      setDescripcion(data[0].descripcion_Producto);
      setPrecioCompra(data[0].precioCompra_Producto);
      setPrecioVenta(data[0].precioVenta_Producto);
      setCodigo(data[0].codigo_Producto);
      setStock(data[0].StockProducto);
      setThumbnail(data[0].thumbnail);
      console.log(data);
    };
    getDataById();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      codigo_Producto: codigo,
      nombre_Producto: nombre,
      descripcion_Producto: descripcion,
      categoria_Producto: categoria,
      precioCompra_Producto: precioCompra,
      precioVenta_Producto: precioVenta,
      StockProducto: stock,
      thumbnail: thumbnail,
    };

    await axios.patch(`http://127.0.0.1:3000/api/productos/${id}`, data);

    navigate("/productos");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Editar producto</h1>
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
          <input type="file" accept="image/*" onChange={handleImagenChange} />
        </label>
        <button type="submit">Editar Producto</button>
      </form>
    </div>
  );
};

export default EditProduct;
