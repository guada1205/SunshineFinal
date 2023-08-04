import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "./productDetail.css";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //#region "props"
  const [idProducto, setIdProducto] = useState();
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precioCompra, setPrecioCompra] = useState();
  const [precioVenta, setPrecioVenta] = useState();
  const [codigo, setCodigo] = useState();
  const [stock, setStock] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [fecha, setFecha] = useState();

  //#endregion

  useEffect(() => {
    const getSingleProductData = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/productos/${id}`
      );
      setIdProducto(data[0].idProducto);
      setNombre(data[0].nombre_Producto);
      setDescripcion(data[0].descripcion_Producto);
      setPrecioCompra(data[0].precioCompra_Producto);
      setPrecioVenta(data[0].precioVenta_Producto);
      setCodigo(data[0].codigo_Producto);
      setStock(data[0].StockProducto);
      setThumbnail(data[0].thumbnail);
      setFecha(data[0].fechaIngreso);
    };
    getSingleProductData();
  }, [id]);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:3000/api/productos/${id}`);
    navigate("/productos");
  };
  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <Link to="/MainAdminPage" className="oButton">
          Volver
        </Link>
      </div>

      <div className="product-info">
        <div>
          <h1>Product Detail</h1>
          <img src={thumbnail} alt={nombre} />
        </div>
        <label>Código:{codigo}</label>
        <label>
          Nombre:
          <strong> {nombre}</strong>
        </label>
        <label>
          Descripcion:
          <strong>{descripcion}</strong>
        </label>
        <label>
          Precio de Compra:
          <strong>{precioCompra}</strong>
        </label>
        <label>
          Precio de Venta:
          <strong>{precioVenta}</strong>
        </label>
        <label>
          Stock:
          <strong> {stock}</strong>
        </label>
        <label>Fecha de Ingreso: {fecha}</label>
      </div>
      <Link className="oButton" to={`/productos/edit/${idProducto}`}>
        Editar
      </Link>

      <button className="oButton" onClick={() => handleDelete(id)}>
        Borrar
      </button>
    </div>
  );
};

export default ProductDetail;
