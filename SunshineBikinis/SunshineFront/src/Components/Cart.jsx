import { CartIcon, ClearCartIcon } from "./Icons";
import { useId } from "react";
import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import "./Cart.css";

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart, removeOneFromCart } = useCart();

  return (
    <div>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul className="ListaProductos">
          {cart.map((product) => (
            <CartItem
              key={product.idProducto}
              addToCart={() => addToCart(product)}
              removeOneFromCart={() => removeOneFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button className="LimpiarButton" onClick={clearCart}>
          <ClearCartIcon />
        </button>
        <Link className="redirectButton" to="/CarritoCompras">
          Ver carrito
        </Link>
      </aside>
    </div>
  );
}
