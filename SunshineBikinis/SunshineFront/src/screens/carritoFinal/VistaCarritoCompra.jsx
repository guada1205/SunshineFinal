import { ClearCartIcon } from "../../Components/Icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../Components/CartItem";
import { useLogin } from "../../hooks/useLogin";
import "./VistaCarritoCompra.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VistaCarritoCompra = () => {
  const Navigate = useNavigate();
  const { user } = useLogin();
  const { cart, clearCart, addToCart, removeOneFromCart } = useCart();
  const [mensaje, setMensaje] = useState("");
  const [costoEnvio, setCostoEnvio] = useState(2000);
  const [montoTotal, setMontoTotal] = useState(0);
  const [isEditingDomicilio, setIsEditingDomicilio] = useState(false);
  const [newDomicilio, setNewDomicilio] = useState("");

  const handleEditDomicilioClick = () => {
    setIsEditingDomicilio(true);
    setNewDomicilio(user.Domicilio_Usuario);
  };

  const handleDomicilioChange = (event) => {
    setNewDomicilio(event.target.value);
  };

  const handleSaveDomicilioClick = async () => {
    setIsEditingDomicilio(false);
    const data = {
      Domicilio_Usuario: newDomicilio,
    };

    await axios
      .patch(
        `http://127.0.0.1:3000/api/users/domicilio/${user.idUsuario}`,
        data
      )
      .then((user.Domicilio_Usuario = newDomicilio))
      .catch(() => setMensaje(`No se pudo actualizar el domicilio`));
  };

  useEffect(() => {
    const monto = cart.reduce((total, producto) => {
      return total + producto.precioVenta_Producto * producto.quantity;
    }, 0);
    if (monto > 20000) {
      setCostoEnvio(0);
    } else {
      setCostoEnvio(2000);
    }
    setMontoTotal(monto + costoEnvio);
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(user).length !== 0) {
      if (cart.length > 0) {
        if (user.Nombre_Permiso === "Administrador") {
          toast.error(
            "Debe iniciar sesion como cliente para realizar la compra",
            {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
          setMensaje("Error al crear la compra");
          return;
        } else {
          const dataCart2Stock = cart.map((producto) => ({
            idProducto: producto.idProducto,
            cantidad: producto.quantity,
          }));

          const data = {
            idUsuario: user.idUsuario,
            montoTotal: montoTotal,
          };
          try {
            await axios
              .post("http://127.0.0.1:3000/api/compras", data)
              .then((res) => {
                clearCart();
                createDetalleCompra(res.data.id);
                Navigate(`/successCompra/${res.data.id}`);
              })
              .catch(() => setMensaje(`Problema con su compra`));
          } catch (error) {
            console.error("Error al crear la compra:");
            setMensaje("Error al crear la compra");
          }

          try {
            await axios
              .post("http://127.0.0.1:3000/api/actualizarStock", {
                productos: dataCart2Stock,
              })
              .then(() => {
                clearCart();
              })
              .catch(() => setMensaje(`Problema con su compra`));
          } catch (error) {
            console.error("Error al crear la compra:");
            setMensaje("Error al crear la compra");
          }
        }
      } else {
        toast.error("Debe agregar productos al carrito", {
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
      Navigate("/login");
    }
  };

  const createDetalleCompra = async (idCompra) => {
    cart.map(async (producto) => {
      const data = {
        idCompra: idCompra,
        idProducto: producto.idProducto,
        precioTotal: producto.precioVenta_Producto * producto.quantity,
        SubTotal: producto.precioVenta_Producto,
        cantidad: producto.quantity,
      };
      try {
        await axios
          .post("http://127.0.0.1:3000/api/compras/detalle", data)
          .then((res) => {
            console.log("res");
          })
          .catch(() => setMensaje(`Problema con su compra`));
      } catch (error) {
        console.error("Error al crear la compra:");
        setMensaje("Error al crear la compra");
      }
    });
  };

  return (
    <div className="first">
      <div className="container-products">
        <ul className="container-lista">
          {cart.map((product) => (
            <CartItem
              key={product.idProducto}
              addToCart={() => addToCart(product, user)}
              removeOneFromCart={() => removeOneFromCart(product, user)}
              {...product}
            />
          ))}
        </ul>
      </div>
      {cart.length > 0 ? (
        <div className="container-data">
          <button className="LimpiarButton" onClick={clearCart}>
            <ClearCartIcon />
            Borrar Carrito
          </button>
          <div className="container-envio">
            <h3>Envio</h3>
            <h3>${costoEnvio}</h3>
          </div>
          <form className="container-total" onSubmit={handleSubmit}>
            <h3>Total</h3>
            <h3>${montoTotal}</h3>

            <div>
              {Object.keys(user).length !== 0 ? (
                <>
                  <h4>Domicilio de envío: {user.Domicilio_Usuario}</h4>
                  {isEditingDomicilio ? (
                    <div>
                      <input
                        type="text"
                        value={newDomicilio}
                        onChange={handleDomicilioChange}
                      ></input>
                      <button onClick={handleSaveDomicilioClick}>
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <button
                      className="editDomicilioButton"
                      onClick={handleEditDomicilioClick}
                    >
                      Cambiar Domicilio
                    </button>
                  )}
                </>
              ) : (
                <p>No hay un usuario para realizar la venta!</p>
              )}
            </div>
            <button className="comprarButton" type="submit">
              {Object.keys(user).length !== 0 ? "Comprar" : "Iniciar Sesion"}
            </button>
            <ToastContainer />
            {mensaje && <p>{mensaje}</p>}
          </form>
        </div>
      ) : (
        <div className="container-data">
          <h2>¡Debe agregar productos al carrito!</h2>
          <button
            className="comprarButton"
            onClick={() => {
              Navigate("/");
              clearCart();
            }}
          >
            Ir al inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default VistaCarritoCompra;
