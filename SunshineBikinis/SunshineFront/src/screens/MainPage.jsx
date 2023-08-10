import "../index.css";
import { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import { Filters as FilterBar } from "../Components/Filters";
import { Footer } from "../Components/Footer";
import { Cart } from "../Components/Cart";
import { Products } from "../Components/Products";
import { useFilters } from "../hooks/useFilters";
import { useLogin } from "../hooks/useLogin";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useCart } from "../hooks/useCart";

function MainPage() {
  const [productos, setProductos] = useState([]);
  const { user } = useLogin();
  const { loadCart } = useCart();
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(productos);

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axios.get("http://127.0.0.1:3000/api/productos");
      setProductos(data);
    };

    console.log("user");
    console.log(user);
    if (Object.keys(user).length !== 0) {
      loadCart(user);
    }

    getProductsData();
  }, [user]);

  return (
    <div>
      <Navbar>
        <Cart />
      </Navbar>
      <Banner />
      <FilterBar />
      <Products products={filteredProducts} />
      <Footer />
    </div>
  );
}

export default MainPage;
