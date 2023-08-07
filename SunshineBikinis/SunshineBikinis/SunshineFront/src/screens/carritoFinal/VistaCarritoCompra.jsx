import { ClearCartIcon } from "../../Components/Icons";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../Components/CartItem";
import { useLogin } from "../../hooks/useLogin";
import "./VistaCarritoCompra.css";
import axios from "axios";
import { useState } from "react";
import VistaLogin from "../Login/VistaLogin";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VistaCarritoCompra = () => {
  const { user } = useLogin();
  const { cart, clearCart, addToCart, removeOneFromCart } = useCart();
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(user).length !== 0) {
      const montoTotal = cart.reduce((total, producto) => {
        return total + producto.precioVenta_Producto * producto.quantity;
      }, 0);
      console.log(montoTotal);
      const formData = new FormData();
      formData.append("idUsuario", 1);
      formData.append("montoTotal", montoTotal);

      try {
        await axios
          .post("http://127.0.0.1:3000/api/compras", formData)
          .then((res) => setMensaje(`Compra realizada con exito: ${res}`))
          .catch((err) => setMensaje(`Problema con su compra: ${err}`));
      } catch (error) {
        console.error("Error al crear la compra:");
        setMensaje("Error al crear la compra");
      }
    } else {
      toast.error("Debe iniciar sesion para realizar la compra", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="first">
      <div className="container-products">
        <ul className="container-lista">
          {cart.map((product) => (
            <CartItem
              key={product.idProducto}
              addToCart={() => addToCart(product)}
              removeOneFromCart={() => removeOneFromCart(product)}
              {...product}
            />
          ))}
        </ul>
      </div>
      <div className="container-data">
        <button className="LimpiarButton" onClick={clearCart}>
          <ClearCartIcon />
          Borrar Carrito
        </button>
        <div className="container-envio">
          <h3>Envio</h3>
          <h3>$0</h3>
        </div>
        <form className="container-total" onSubmit={handleSubmit}>
          <h3>Total</h3>
          <h3>
            $
            {cart.reduce(
              (acc, el) => acc + el.quantity * el.precioVenta_Producto,
              0
            )}
          </h3>
          {}
          <button className="comprarButton" type="submit">
            Comprar
          </button>
          <ToastContainer />
          {mensaje && <p>{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default VistaCarritoCompra;
