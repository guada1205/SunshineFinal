import { createContext, useState } from "react";
import axios from "axios";

export const Cartcontext = createContext();
//Volver atras
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  //#region "BBDD CART"
  const agregarCarritoBBDD = async (product, user) => {
    const data = {
      idUsuario: user.idUsuario,
      idProducto: product.idProducto,
      cantidad: 1,
    };

    await axios
      .post("http://127.0.0.1:3000/api/carrito", data)
      .catch((err) => console.log(err));
  };

  const removeCarritotoBBDD = async (product, user) => {
    const data = {
      idUsuario: user.idUsuario,
      idProducto: product.idProducto,
    };

    await axios
      .patch("http://127.0.0.1:3000/api/carrito", data)
      .catch((err) => console.log(err));
  };

  const deleteFromCartBBDD = async (product, user) => {
    const data = {
      idUsuario: user.idUsuario,
      idProducto: product.idProducto,
    };

    await axios
      .delete(
        `http://127.0.0.1:3000/api/carrito/${data.idProducto}/${data.idUsuario}`,
        data
      )
      .catch((err) => console.log(err));
  };

  const vaciarCarritoBBDD = async (user) => {
    await axios
      .delete(`http://127.0.0.1:3000/api/carrito/${user.idUsuario}`)
      .catch((err) => console.log(err));
  };

  //#endregion

  const addToCart = (product, user = "") => {
    const productInCartIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      const newQuantity = newCart[productInCartIndex].quantity + 1;
      const newStock = newCart[productInCartIndex].StockProducto - newQuantity;
      if (newStock >= 0) {
        newCart[productInCartIndex].quantity += 1;
        if (Object.keys(user).length !== 0) {
          agregarCarritoBBDD(product, user);
        }
      }
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);

    if (Object.keys(user).length !== 0) {
      agregarCarritoBBDD(product, user);
    }
  };

  const removeOneFromCart = (product, user = "") => {
    const productInCartIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    console.log(productInCartIndex, product, user);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);

      if (Object.keys(user).length !== 0) {
        removeCarritotoBBDD(product, user);
      }

      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity -= 1;
        return setCart(newCart);
      } else {
        removeFromCart(product, user);
      }
    }
  };

  const removeFromCart = (product, user = "") => {
    if (Object.keys(user).length !== 0) {
      deleteFromCartBBDD(product, user);
    }
    setCart((prevState) =>
      prevState.filter((item) => item.idProducto !== product.idProducto)
    );
  };

  const clearCart = (user = "", deepDelete = false) => {
    if (Object.keys(user).length !== 0 && deepDelete) {
      vaciarCarritoBBDD(user);
    }
    setCart([]);
  };

  const loadCart = async (user) => {
    const id = user.idUsuario;
    clearCart();
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/carrito/${id}`
      );
      setCart(data);
    } catch (error) {
      console.log("error al traer carrito");
      console.log(error);
    }
  };

  return (
    <Cartcontext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
