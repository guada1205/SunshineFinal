import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export function Products({ products }) {
  const { cart, removeFromCart, addToCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.idProducto === product.idProducto);
  };

  return (
    <div className="products">
      <ul className="products-list">
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);
          return (
            <li key={product.idProducto} className="products-list-item">
              <img src={product.thumbnail} alt={product.nombre_Producto} />
              <div>
                <strong>{product.nombre_Producto}</strong> - $
                {product.precioVenta_Producto}
              </div>
              <div>
                <button
                  style={{ color: isProductInCart ? "red" : "green" }}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
                <Link to={`/productosClient/${product.idProducto}`}>
                  Ver Producto
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
