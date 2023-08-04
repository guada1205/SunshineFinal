import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate();

  return (
    <header>
      <img src="/images/sunshine.png" alt="Logo" />
      <div>
        <button
          className="navBar-Button"
          onClick={() => navigate("/MainAdminPage")}
        >
          Administrar Productos
        </button>
        {children}
      </div>
    </header>
  );
};

export default Navbar;
