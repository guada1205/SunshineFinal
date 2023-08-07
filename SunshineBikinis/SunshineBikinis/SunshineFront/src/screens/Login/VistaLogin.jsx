import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VistaLogin = () => {
  const { user, loginUser, logoutUser } = useLogin();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Email_Usuario: email,
      Contrasena_Usuario: contrasena,
    };

    await axios
      .post("http://127.0.0.1:3000/api/users", data)
      .then((response) => {
        loginUser(response.data);
        navigate("/productos");
        return response;
      })
      .catch((error) =>
        toast.error(`Error: ${error.response.data.mensaje}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
    //
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/productos");
  };

  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={contrasena}
            onChange={handleContrasenaChange}
            placeholder="Contraseña"
          />
          <ToastContainer />
          <button type="submit">Iniciar sesión</button>
        </form>
      ) : (
        <div>
          <p>¡Hola, {user.Nombre_Usuario}!</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default VistaLogin;
