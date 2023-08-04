// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./screens/MainPage";
import AddProduct from "./screens/AddProduct";
import EditProducts from "./screens/EditProducts";
import ProductDetail from "./screens/ProductDetail";
import FewProductDetails from "./screens/FewProductDetails";
import MainAdminPage from "./screens/MainAdminPage";
import CarritoCompra from "./screens/carritoFinal/CarritoCompra";
// import VistaLogin from "./screens/Login/VistaLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={MainPage}></Route>
        <Route exact path="/productos" Component={MainPage}></Route>
        <Route exact path="/AddProductos" Component={AddProduct}></Route>
        <Route
          exact
          path="/productos/edit/:id"
          Component={EditProducts}
        ></Route>
        <Route exact path="/productos/:id" Component={ProductDetail}></Route>
        <Route
          exact
          path="/productosClient/:id"
          Component={FewProductDetails}
        ></Route>
        <Route exact path="/MainAdminPage" Component={MainAdminPage}></Route>
        <Route exact path="/CarritoCompras" Component={CarritoCompra}></Route>
      </Routes>
    </Router>
  );
}

export default App;
