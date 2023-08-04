export function CartItem({
  thumbnail,
  nombre_Producto,
  precioVenta_Producto,
  quantity,
  addToCart,
  removeOneFromCart,
}) {
  return (
    <li className="lista-item">
      <img src={thumbnail} alt={nombre_Producto} />
      <div>
        <strong>{nombre_Producto}</strong> - ${precioVenta_Producto}
      </div>
      <div>
        <strong>Subtotal:</strong> ${quantity * precioVenta_Producto}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={removeOneFromCart}>-</button>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}
