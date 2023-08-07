import "./Navbar.css";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const { user, logoutUser } = useLogin();

  const [mostrarBoton, setMostrarBoton] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (user.Nombre_Permiso === "Administrador") {
        setMostrarBoton(true);
      } else {
        setMostrarBoton(false);
      }
    } else {
      setMostrarBoton(false);
    }
  }, [user]);

  const handleLogout = () => {
    toast.error("Se cerró la sesión", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    logoutUser();
  };

  return (
    <header>
      <img src="/images/sunshine.png" alt="Logo" />
      <div>
        <div>
          {mostrarBoton && (
            <button
              className="navBar-Button"
              onClick={() => navigate("/MainAdminPage")}
            >
              Administrar Productos
            </button>
          )}
        </div>
        <button
          onClick={() => {
            {
              Object.keys(user).length === 0
                ? navigate("/login")
                : handleLogout();
            }
          }}
          className="navBar-Button"
        >
          {Object.keys(user).length === 0 ? "Login" : "Logout"}
        </button>
        <ToastContainer />

        {children}
      </div>
    </header>
  );
};

export default Navbar;
