import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./FewProductDetails.css";
import axios from "axios";

const FewProductDetails = () => {
  const { id } = useParams();

  //#region "props"
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precioVenta, setPrecioVenta] = useState();
  const [stock, setStock] = useState();
  const [thumbnail, setThumbnail] = useState();

  //#endregion

  useEffect(() => {
    const getSingleProductData = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/productos/${id}`
      );
      setNombre(data[0].nombre_Producto);
      setDescripcion(data[0].descripcion_Producto);
      setPrecioVenta(data[0].precioVenta_Producto);
      setStock(data[0].StockProducto);
      setThumbnail(data[0].thumbnail);
    };
    getSingleProductData();
  }, [id]);

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <Link className="oButton" to="/productos">
          Volver
        </Link>
      </div>

      <div className="product-info">
        <h1>Product Detail</h1>
        <div>
          <img src={thumbnail} alt={nombre} />
        </div>
        <label>
          Nombre:
          <strong> {nombre}</strong>
        </label>
        <label>
          Descripcion:
          <strong>{descripcion}</strong>
        </label>

        <label>
          Precio de Venta:
          <strong>{precioVenta}</strong>
        </label>
        <label>
          Stock:
          <strong> {stock > 0 ? "Hay stock" : "Sin Stock"}</strong>
        </label>
      </div>
    </div>
  );
};

export default FewProductDetails;
