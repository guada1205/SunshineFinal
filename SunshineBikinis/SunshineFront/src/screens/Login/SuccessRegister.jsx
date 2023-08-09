import { useNavigate } from "react-router-dom";

const SuccessRegister = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <h3>Registro finalizado</h3>
        <p> Gracias por registrarse, Inicie sesión para continuar</p>
        <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default SuccessRegister;
