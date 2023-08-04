import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import VistaCarritoCompra from "./VistaCarritoCompra";

const CarritoCompra = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="product-detail-header">
        <Link to="/" className="oButton">
          Volver
        </Link>
      </div>
      <VistaCarritoCompra></VistaCarritoCompra>
    </div>
  );
};

export default CarritoCompra;
