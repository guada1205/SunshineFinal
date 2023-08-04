import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainAdminPage.css";

const MainAdminPage = () => {
  const [idProducto, setIdProducto] = useState(0);
  const navigate = useNavigate();

  const handleIdProductoChange = (event) => {
    if (event.target.value > 0) {
      setIdProducto(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const response = await axios
      .get(`http://127.0.0.1:3000/api/productos/${idProducto}`)
      .then((res) => res)
      .catch(() => alert("No existe un producto con ese ID"));
    if (response.data) {
      navigate(`/productos/${idProducto}`);
    } else {
      alert("No existe un producto con ese ID");
    }
  };

  return (
    <div className="page-admin">
      <h1>Administrador de Productos</h1>

      <div className="page-admin-container">
        <button className="Button" onClick={() => navigate("/AddProductos")}>
          Agregar Producto
        </button>

        <label>
          Ingrese el id del producto a buscar:
          <input
            type="number"
            placeholder="ID Producto"
            onChange={handleIdProductoChange}
          />
        </label>
        <button className="Button" onClick={() => handleSubmit()}>
          Editar Producto
        </button>
      </div>
    </div>
  );
};

export default MainAdminPage;
