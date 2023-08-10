import { pool } from '../db.js'

export const getCarrito = async (req, res) => { 
  try {
    const query = 'SELECT p.*, c.quantity FROM carrito c JOIN productos p ON c.idProducto = p.idProducto WHERE c.idUsuario = ?';
    const [rows] = await pool.query(query, [req.params.id])
    

    const cartData = rows.filter(product => product.quantity <= product.StockProducto); // Filtrar productos que no superen el stock
    
    const productosFormated = cartData.map((producto) => ({ 
      ...producto,
      precioCompra_Producto: parseFloat(producto.precioCompra_Producto),
      precioVenta_Producto: parseFloat(producto.precioVenta_Producto),
      thumbnail: `http://localhost:3000/images/${producto.thumbnail}`
    }))

    if (cartData.length > 0) {
      res.json(productosFormated);
    } else {
      res.status(404).json({ message: "Not Found" })
    }
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const addCarrito = async (req, res) => { 
  const { idUsuario, idProducto, cantidad } = req.body;

  const [rows] = await pool.query("INSERT INTO carrito (idUsuario, idProducto, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + 1", [idUsuario, idProducto, cantidad]);

  res.send({ id: rows.insertId, ...req.body });
}

export const removeCarrito = async (req, res) => { 
    const { idUsuario, idProducto } = req.body;

  try {
    const [existingCartItem] = await pool.query("SELECT * FROM carrito WHERE idUsuario = ? AND idProducto = ?", [idUsuario, idProducto]);

    if (!existingCartItem[0] || existingCartItem[0].length === 0) {
      return res.status(404).json({ mensaje: "El producto no está en el carrito" });
    }
    if (existingCartItem[0].quantity > 1) {
      const [updateResult] = await pool.query("UPDATE carrito SET quantity = quantity - 1 WHERE idUsuario = ? AND idProducto = ?", [idUsuario, idProducto]);
      console.log("Producto reducido en cantidad:", updateResult);
    } else {
      const [deleteResult] = await pool.query("DELETE FROM carrito WHERE idUsuario = ? AND idProducto = ?", [idUsuario, idProducto]);
      console.log("Producto eliminado del carrito:", deleteResult);
    }

    res.json({ mensaje: "Producto removido del carrito" });
  } catch (error) {
    console.error("Error al quitar del carrito:", error);
    res.status(500).json({ mensaje: "Error al quitar del carrito" });
  }
}
export const deleteCarrito = async (req, res) => { 
  const { idUsuario, idProducto } = req.params;

  console.log(idUsuario, idProducto)
  try {
    const [rows] = await pool.query('DELETE FROM carrito WHERE idUsuario = ? AND idProducto = ?', [idUsuario, idProducto])

    if (rows.affectedRows > 0) {
      res.json({ message: "Producto eliminado del carrito" })
    } else {
      res.status(404).json({ message: "Producto no encontrado" })
    }
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const vaciarCarrito = async (req, res) => { 
  const { idUsuario } = req.params;

  try {
    const [rows] = await pool.query('DELETE FROM carrito WHERE idUsuario = ?', [idUsuario])

    if (rows.affectedRows > 0) {
      res.json({ message: "Carrito vaciado" })
    } else {
      res.status(404).json({ message: "Carrito no encontrado" })
    }
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}