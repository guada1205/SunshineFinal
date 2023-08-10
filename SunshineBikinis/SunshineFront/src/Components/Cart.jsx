import { CartIcon, ClearCartIcon } from "./Icons";
import { useId } from "react";
import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "./Cart.css";

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart, removeOneFromCart } = useCart();
  const { user } = useLogin();

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
              addToCart={() => addToCart(product, user)}
              removeOneFromCart={() => removeOneFromCart(product, user)}
              {...product}
            />
          ))}
        </ul>
        {cart.length > 0 ? (
          <div>
            <button className="LimpiarButton" onClick={clearCart}>
              <ClearCartIcon />
            </button>
            <Link className="redirectButton" to="/CarritoCompras">
              Ver carrito
            </Link>
          </div>
        ) : (
          ""
        )}
      </aside>
    </div>
  );
}
