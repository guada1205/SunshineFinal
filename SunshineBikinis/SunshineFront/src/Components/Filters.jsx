import { useId } from "react";
import { useFilters } from "../hooks/useFilters";
import "./Filters.css";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleMinPriceChange = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };
  return (
    <section className="filters">
      <div className="minPrice">
        <label htmlFor={minPriceFilterId}>Precio: </label>
        <input
          type="range"
          id={minPriceFilterId}
          min="100"
          max="20000"
          onChange={handleMinPriceChange}
          value={filters.minPrice}
        />
        <span className="precio">${filters.minPrice}</span>
      </div>
      <div className="category">
        <label htmlFor={categoryFilterId}>Categoría: </label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="Bikini">Bikini</option>
          <option value="Trikini hermosa">Trikini</option>
        </select>
      </div>
    </section>
  );
}
