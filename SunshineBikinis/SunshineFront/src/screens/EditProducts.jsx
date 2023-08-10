import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./addProduct.css";
import { useFilters } from "../hooks/useFilters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../hooks/useLogin";

const EditProduct = () => {
  const navigate = useNavigate();

  //#region "props"

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(); // Usamos un estado para la imagen
  const { user } = useLogin();
  const { categorias } = useFilters();
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
    setThumbnail(event.target.files[0]);
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

    await axios
      .patch(`http://127.0.0.1:3000/api/productos/${id}`, data)
      .then(navigate("/productos"))
      .catch(() => {
        setNombre("");
        setDescripcion("");
        setPrecioCompra(0);
        setPrecioVenta(0);
        setCodigo("");
        setStock(0);
        setThumbnail(null);
        toast.warn(`No se pudo editar`);
      });
  };

  return (
    <>
      {Object.keys(user).length !== 0 &&
      user.Nombre_Permiso === "Administrador" ? (
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
              <input type="file" onChange={handleImagenChange} />
            </label>
            <button type="submit">Editar Producto</button>
            <ToastContainer
              position="top-left"
              autoClose={2000}
              limit={3}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EditProduct;
