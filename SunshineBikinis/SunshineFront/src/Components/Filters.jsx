import { useId } from "react";
import { useFilters } from "../hooks/useFilters";
import "./Filters.css";

export function Filters() {
  const { categorias, filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const maxPriceFilterId = useId();
  const ordenFilterId = useId();
  const nombreFilterId = useId();

  const handleMinPriceChange = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };
  const handleMaxPriceChange = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const handleChangeOrden = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      orden: event.target.value,
    }));
  };

  const handleNombreChaneg = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      nombre: event.target.value,
    }));
  };
  return (
    <section className="filters">
      <div className="nombre">
        <label htmlFor={nombreFilterId}>Orden: </label>
        <input
          id={nombreFilterId}
          type="text"
          value={filters.nombre}
          onChange={handleNombreChaneg}
        ></input>
      </div>
      <div className="minPrice">
        <label htmlFor={minPriceFilterId}>Precio Mínimo: </label>
        <input
          type="range"
          id={minPriceFilterId}
          min="100"
          max="20000"
          onChange={handleMinPriceChange}
          value={filters.minPrice}
        />
        <span className="precio">${filters.minPrice}</span>

        <label htmlFor={maxPriceFilterId}>Precio Máximo: </label>
        <input
          type="range"
          id={maxPriceFilterId}
          min="100"
          max="20000"
          onChange={handleMaxPriceChange}
          value={filters.maxPrice}
        />
        <span className="precio">${filters.maxPrice}</span>
      </div>
      <div className="category">
        <label htmlFor={categoryFilterId}>Categoría: </label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="category">
        <label htmlFor={ordenFilterId}>Orden: </label>
        <select id={ordenFilterId} onChange={handleChangeOrden}>
          <option value="asc">Precio Mas alto - Mas Bajo</option>
          <option value="desc">Precio Mas Bajo - Mas alto</option>
        </select>
      </div>
    </section>
  );
}
