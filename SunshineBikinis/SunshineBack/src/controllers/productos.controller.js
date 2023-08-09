import { pool } from '../db.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'images')
  },
  filename: function (req, file, cb) { 
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({ storage: storage })

export const createProducto = async (req, res) => { 

  const { codigo_Producto,
         nombre_Producto,
        descripcion_Producto,
        categoria_Producto,
        precioCompra_Producto,
        precioVenta_Producto,
        StockProducto,
        } = req.body
  
  try {   
    const [rows] = await pool.query('INSERT INTO productos (codigo_Producto, nombre_Producto, descripcion_Producto, categoria_Producto, precioCompra_Producto,precioVenta_Producto, StockProducto, thumbnail) VALUES (?,?,?,?,?,?,?,?)', [codigo_Producto, nombre_Producto, descripcion_Producto, categoria_Producto, parseFloat(precioCompra_Producto), parseFloat(precioVenta_Producto), StockProducto, req.file.filename])
  
    res.send({ id: rows.insertId, ...req.body });
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const getProductos = async (req, res) => {
  try
  {
    const [rows] = await pool.query('SELECT * FROM productos')

    const productosFormated = rows.map((producto) => ({ 
      ...producto,
      precioCompra_Producto: parseFloat(producto.precioCompra_Producto),
      precioVenta_Producto: parseFloat(producto.precioVenta_Producto),
      thumbnail: `http://localhost:3000/images/${producto.thumbnail}`
    }))

    res.json(productosFormated)
  }catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const getUnProducto = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE idProducto = ?', [req.params.id])

    if (rows.length > 0) {
      const productoEnDecimal = rows.map((producto) => ({ 
      ...producto,
      precioCompra_Producto: parseFloat(producto.precioCompra_Producto),
      precioVenta_Producto: parseFloat(producto.precioVenta_Producto),
      thumbnail: `http://localhost:3000/images/${producto.thumbnail}`
    }))
    
    res.json(productoEnDecimal)
    } else {
      res.status(404).json({ message: "Producto no encontrado" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteProducto = async (req, res) => {
  try {
    const [rows] = await pool.query('DELETE FROM productos WHERE idProducto = ?', [req.params.id])
    if (rows.affectedRows > 0) {
      res.status(204).json({ message: "Producto eliminado" })
    }
    else  res.status(404).json({ message: "No se encontró el producto" })
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const updateProducto = async (req, res) => {
  const id = req.params.id

  const { codigo_Producto,
         nombre_Producto,
        descripcion_Producto,
        categoria_Producto,
        precioCompra_Producto,
        precioVenta_Producto,
        StockProducto,
        } = req.body
  
  try {
    const query =
      'UPDATE productos SET codigo_Producto = IFNULL(?, codigo_Producto), nombre_Producto = IFNULL(?, nombre_Producto), descripcion_Producto = IFNULL(?, descripcion_Producto), categoria_Producto = IFNULL(?, categoria_Producto), precioCompra_Producto = IFNULL(?, precioCompra_Producto), precioVenta_Producto = IFNULL(?, precioVenta_Producto), StockProducto = IFNULL(?, StockProducto) WHERE idProducto = ?'
  
    const [rows] = await pool.query(query, [codigo_Producto, nombre_Producto, descripcion_Producto, categoria_Producto, parseFloat(precioCompra_Producto), parseFloat(precioVenta_Producto), StockProducto, id])
    
    if (rows.affectedRows === 0) return res.status(404).json({ message: "No se encontró el producto" })
  
    const [result] = await pool.query('SELECT * FROM productos WHERE idProducto = ?', [id])
    res.json(result[0])
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}