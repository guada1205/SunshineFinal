import { useContext } from "react";
import { FilterContext } from "../context/filters.jsx";

export function useFilters() {
  const { filters, setFilters, categorias} = useContext(FilterContext);

  const filterProducts = (products) => {
    // return products.filter((product) => {
    //     return (
    //       product.precioVenta_Producto >= filters.minPrice &&  product.precioVenta_Producto <= filters.maxPrice &&
    //       (filters.category === "all" || product.categoria_Producto === filters.category)
    //     );
    // });
    let filteredProducts = [...products];

    if (filters.orden === "asc") {
      filteredProducts.sort((a, b) =>
         a.precioVenta_Producto - b.precioVenta_Producto
      );
    } else if (filters.orden === "desc") {
      filteredProducts.sort((a, b) =>
        b.precioVenta_Producto - a.precioVenta_Producto
      );
    }

    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.precioVenta_Producto >= filters.minPrice &&
        product.precioVenta_Producto <= filters.maxPrice &&
        (filters.category === "all" ||
          product.categoria_Producto === filters.category)
      );
    });

    return filteredProducts;
  };
  return { filters, filterProducts, setFilters, categorias };
}
