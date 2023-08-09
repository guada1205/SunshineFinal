import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./vistaRegistro.css";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";

import "react-toastify/dist/ReactToastify.css";

const VistaRegistro = () => {
  //#region "props"

  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [calle, setCalle] = useState("");

  const handleCalleChange = (event) => {
    setCalle(event.target.value);
  };
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };
  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };
  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };
  const handleRepeitrContrasenaChange = (event) => {
    setRepetirContrasena(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };
  //#endregion

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena !== repetirContrasena) {
      toast.error(`Error: Las contraseñas no coinciden`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (
      nombre === "" ||
      apellido === "" ||
      numero === "" ||
      email === "" ||
      contrasena === "" ||
      repetirContrasena === "" ||
      calle === ""
    ) {
      toast.error(`Error: No se pueden dejar campos vacios`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    const data = {
      Nombre_Usuario: nombre,
      Apellido_Usuario: apellido,
      Email_Usuario: email,
      numContacto_Usuario: numero,
      Contrasena_Usuario: contrasena,
      Domicilio_Usuario: calle,
      Permiso_Usuario: 4,
    };

    await axios
      .post("http://127.0.0.1:3000/api/users/register", data)
      .then((response) => {
        navigate("/successSignup");
        return response;
      })
      .catch((error) => {
        toast.error(`Error: ${error.response.data.mensaje}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setContrasena("");
        setRepetirContrasena("");
        return error;
      });

    //
  };

  return (
    <div>
      <Navbar></Navbar>
      <form className="Registrar-form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <div className="name-fields">
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={apellido}
            onChange={handleApellidoChange}
            placeholder="Apellido"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />

        <input
          type="number"
          value={numero}
          onChange={handleNumeroChange}
          placeholder="Numero de contacto"
        />

        <input
          type="text"
          value={calle}
          onChange={handleCalleChange}
          placeholder="Domicilio"
        />

        <input
          type="password"
          value={contrasena}
          onChange={handleContrasenaChange}
          placeholder="Contraseña"
        />
        <input
          type="password"
          value={repetirContrasena}
          onChange={handleRepeitrContrasenaChange}
          placeholder="Repetir contraseña"
        />
        <ToastContainer />
        <button type="submit">Registrarse</button>
        <a onClick={() => navigate("/login")}>Ir a Login</a>
      </form>
      <Footer />
    </div>
  );
};

export default VistaRegistro;
