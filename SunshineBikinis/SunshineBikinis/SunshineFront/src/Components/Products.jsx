import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Products({ products }) {
  const { cart, removeFromCart, addToCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.idProducto === product.idProducto);
  };

  const handleCart = (action, product) => {
    switch (action) {
      case "removeFromCart":
        toast.warn(`Producto removido del carrito`);
        removeFromCart(product);
        break;
      case "addToCart":
        toast.success(`Producto agregado al carrito`);
        addToCart(product);
        break;
    }
  };
  return (
    <div className="products">
      <ul className="products-list">
        <ToastContainer
          position="top-left"
          autoClose={2000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
                      ? handleCart("removeFromCart", product)
                      : handleCart("addToCart", product);
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
