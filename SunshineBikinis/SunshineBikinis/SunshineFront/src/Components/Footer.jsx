import "./Footer.css";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";

export function Footer() {
  const { cart } = useCart();
  const { user } = useLogin();

  useEffect(() => {
    console.log(cart);
    console.log(user);
  }, [cart, user]);

  return (
    <div className="footer-content">
      <p>Hecho con amor ♥️ </p>
      <ul className="footer-listado">
        <li>
          {" "}
          <a>Contacto</a>
        </li>
        <li>
          {" "}
          <a>Puntos de retiro</a>
        </li>
        <li>
          {" "}
          <a>Politica de cambios y Devoluciones</a>
        </li>
        <li>
          {" "}
          <a>Nuestra Historia</a>
        </li>
      </ul>
      <a>FAQ</a>
      <br />
      <p>¡Mantente al día en nuestras redes!</p>
      <ul className="socials">
        <li>
          <i className="fa-brands fa-twitter"></i>
          <a>Twitter</a>
        </li>
        <li>
          <i className="fa-brands fa-instagram"></i>
          <a>Instagram</a>
        </li>
        <li>
          <i className="fa-brands fa-facebook"></i>
          <a>Facebook</a>
        </li>
      </ul>
      <p>Copyright &copy; 2023 - Sunshine.com.ar</p>
      <br />
    </div>
  );
}
