import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import axios from "axios";
import "./SuccessCompra.css";
const SuccessCompra = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [idCompra, setIdCompra] = useState();
  const [Total, setTotal] = useState();
  const [estado, setEstado] = useState();
  const [fecha, setFecha] = useState();
  const [detalleCompra, setDetalleCompra] = useState([]);

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/compras/${id}`
      );
      setIdCompra(data[0].idCompra);
      setTotal(data[0].montoTotal);
      setEstado(data[0].estado);
      setFecha(data[0].fechaEnvio);

      getDataDetalleById();
    };

    const getDataDetalleById = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/compras/detalle/${id}`
      );
      setDetalleCompra(data);
    };

    getDataById();
  }, [id]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="successcompra-container">
        <h2>Para completar su pedido, transfiera el Monto Toal al alias: </h2>
        <h3>guadalupe.almada.mp</h3>
        <small>Nos contactaremos con ud. a la brevedad</small>
        <br />
        <br />

        <h4>Datos de su pedido:</h4>

        <p>Numero de compra: {idCompra}</p>
        <p>Total: ${Total}</p>
        <p>Estado: {estado ? "Entregado" : "En Proceso"}</p>
        <p>Fecha aproximada de envío: {fecha}</p>

        <h4>Detalle de su pedido: </h4>

        <ul>
          {detalleCompra.map((product) => {
            return (
              <li
                key={product.idProducto}
                className="products-list-item-successcompra"
              >
                <div>
                  Producto: <strong>{product.idProducto}</strong> - $
                  {product.SubTotal}
                  <br />
                  <strong>
                    Cantidad: {product.cantidad} - Total: ${product.precioTotal}
                  </strong>
                </div>
              </li>
            );
          })}
        </ul>

        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessCompra;
