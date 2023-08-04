import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FiltersProvider } from "./context/filters";
import { CartProvider } from "./context/cart";
// import { LoginProvider } from "./context/login";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <LoginProvider>
  <CartProvider>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </CartProvider>
  // </LoginProvider>
);
