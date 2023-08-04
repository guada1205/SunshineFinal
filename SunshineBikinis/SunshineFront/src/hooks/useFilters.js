import { useContext } from "react";
import { FilterContext } from "../context/filters.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.precioVenta_Producto >= filters.minPrice &&
        (filters.category === "all" || product.categoria_Producto === filters.category)
      );
    });
  };
  return { filters, filterProducts, setFilters };
}
