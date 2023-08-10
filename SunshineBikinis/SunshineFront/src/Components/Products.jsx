import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../hooks/useLogin";
import "react-toastify/dist/ReactToastify.css";

export function Products({ products }) {
  const { cart, removeFromCart, addToCart } = useCart();
  const { user } = useLogin();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.idProducto === product.idProducto);
  };

  const handleCart = (action, product) => {
    switch (action) {
      case "removeFromCart":
        toast.warn(`Producto removido del carrito`, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        removeFromCart(product, user);
        break;
      case "addToCart":
        toast.success(`Producto agregado al carrito`, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
          theme: "colored",
        });
        addToCart(product, user);
        break;
    }
  };
  return (
    <div className="products">
      <ul className="products-list">
        {products.map((product) => {
          if (product.StockProducto > 0) {
            const isProductInCart = checkProductInCart(product);
            return (
              <li key={product.idProducto} className="products-list-item">
                <img src={product.thumbnail} alt={product.nombre_Producto} />
                <div>
                  <strong>{product.nombre_Producto}</strong> - $
                  {product.precioVenta_Producto}
                  <br />
                  <small>Stock: {product.StockProducto}</small>
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
                    {isProductInCart ? (
                      <RemoveFromCartIcon />
                    ) : (
                      <AddToCartIcon />
                    )}
                  </button>
                  <Link to={`/productosClient/${product.idProducto}`}>
                    Ver Producto
                  </Link>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
