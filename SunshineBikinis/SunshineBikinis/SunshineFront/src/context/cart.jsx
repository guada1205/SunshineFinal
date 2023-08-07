import { createContext, useState } from "react";

export const Cartcontext = createContext();
//Volver atras
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeOneFromCart = (product) => {
    const productInCartIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity -= 1;
        return setCart(newCart);
      } else {
        removeFromCart(product);
      }
    }
  };

  const removeFromCart = (product) => {
    setCart((prevState) =>
      prevState.filter((item) => item.idProducto !== product.idProducto)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Cartcontext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        clearCart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
