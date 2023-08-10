import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import axios from "axios";
import "./SuccessCompra.css";
import { useLogin } from "../../hooks/useLogin";
const SuccessCompra = () => {
  const navigate = useNavigate();
  const { user } = useLogin();
  const { id } = useParams();
  const [compra, setCompra] = useState([]);
  const [detalleCompra, setDetalleCompra] = useState([]);

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/compras/${id}`
      );
      setCompra(data[0]);
      getDataDetalleById();
    };

    const getDataDetalleById = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/compras/detalle/${id}`
      );
      setDetalleCompra(data);
    };
    getDataById();
    console.log(compra);
    console.log(detalleCompra);
    console.log(user);
  }, [id]);

  return (
    <>
      {Object.keys(user).length !== 0 && user.idUsuario === compra.idUsuario ? (
        <div>
          <Navbar></Navbar>
          <div className="successcompra-container">
            <h2>
              Para completar la compra, realizar la transferencia al siguiente
              alias:{" "}
            </h2>
            <h3>guadalupe.almada.mp</h3>
            <small>Nos contactaremos con ud. a la brevedad</small>
            <br />
            <br />
            <h4>Datos Personales:</h4>
            <p>
              Nombre: {user.Nombre_Usuario} {user.Apellido_Usuario}
            </p>
            <p>Email: {user.Email_Usuario}</p>
            <p>Telefono: {user.numContacto_Usuario}</p>
            <p>Direccion: {user.Domicilio_Usuario}</p>
            <br />
            <h4>Datos de su pedido:</h4>

            <p>Numero de compra: {compra.idCompra}</p>
            <p>Total: ${compra.montoTotal}</p>
            <p>Estado: {compra.estado ? "Entregado" : "En Proceso"}</p>
            <p>Fecha aproximada de envío: {compra.fechaEnvio}</p>
            <br />
            <h4>Detalle de su pedido: </h4>

            <ul>
              {detalleCompra.map((product, index) => {
                return (
                  <li key={index} className="products-list-item-successcompra">
                    <div>
                      Producto: <strong>{product.nombre_Producto}</strong> - $
                      {product.SubTotal}
                      <br />
                      <strong>
                        Cantidad: {product.cantidad} - Total: $
                        {product.precioTotal}
                      </strong>
                    </div>
                  </li>
                );
              })}
            </ul>

            <br />
            <strong>Datos de contacto:</strong>
            <p>WhatsApp: 1165673641</p>
            <p>Email: contacto@sunshine.com</p>

            <button onClick={() => navigate("/")}>Volver al inicio</button>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <h1>Ud. no tiene el usuario requerido</h1>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SuccessCompra;
