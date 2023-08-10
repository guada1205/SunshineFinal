import { useEffect, useState } from "react";
import axios from "axios";
import "./gestionOrdenesCompra.css";
import Navbar from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useLogin } from "../hooks/useLogin";

const GestionOrdenesCompra = () => {
  const [comprasData, setComprasData] = useState([]);
  const { user } = useLogin();
  useEffect(() => {
    const fetchData = async () => {
      console.log("concha");
      try {
        const response = await axios.get("http://localhost:3000/api/compras");
        console.log(response);
        setComprasData(response.data);
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {Object.keys(user).length !== 0 &&
      user.Nombre_Permiso === "Administrador" ? (
        <div className="gestion-ordenes">
          <Navbar></Navbar>
          <h2>Lista de Compras</h2>

          {comprasData && comprasData.length > 0 ? (
            <div className="compra-list">
              {comprasData.map((compra, index) => (
                <div key={index} className="compra-item">
                  <h2>Compra ID: {compra.idCompra}</h2>
                  <p>
                    Usuario: {compra.Nombre_Usuario} {compra.Apellido_Usuario}
                  </p>
                  <p>Email: {compra.Email_Usuario}</p>
                  <p>Numero de contacto: {compra.numContacto_Usuario}</p>
                  <p>Fecha de Compra: {compra.fechaCompra}</p>
                  <p>Estado: {compra.estado ? "Entregado" : "En Proceso"}</p>
                  <p>Fecha de Envío: {compra.fechaEnvio}</p>
                  <p>Dirección de entrega: {compra.Domicilio_Usuario}</p>
                  <h3>Detalle de la Compra:</h3>
                  <ul>
                    {compra.detalleCompra.map((detalle, index) => (
                      <li key={index} className="detalle-item">
                        Producto: {detalle.nombre_Producto}, Cantidad:{" "}
                        {detalle.cantidad}, Subtotal: {detalle.SubTotal}, Total:{" "}
                        {detalle.precioTotal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>No hay ordenes de compra</h2>
            </div>
          )}
          <Footer />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default GestionOrdenesCompra;
