import { createContext, useState } from "react";

export const FilterContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    orden: "asc",
    minPrice: 100,
    maxPrice: 20000,
  });
  const categorias = ["Bikinis", "Trikinis", "Enterizas", "Vintage"];
  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        categorias,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
