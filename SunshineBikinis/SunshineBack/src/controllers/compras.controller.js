import { pool } from '../db.js'

export const createCompra = async (req, res) => { 
  const { idUsuario, montoTotal } = req.body
  
    try {   
    const [rows] = await pool.query('INSERT INTO compra (idUsuario, montoTotal) VALUES (?,?)', [idUsuario, parseFloat(montoTotal)])
    
    if (rows.affectedRows < 1) {
    res.status(500).json({ mensaje: 'No se pudo geenerar la venta' });
    } else {
     res.send({ id: rows.insertId, ...req.body });
    }
     
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const getUnaCompra = async (req, res) => { 
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM compra WHERE idCompra = ?', [id])

    if (rows.length < 1) {
      console.error('No hay compras');
      res.status(500).json({ mensaje: 'No hay compras' });
    } else {
      res.status(200).json(rows);
    }

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la compra' });
  }
} 

export const getCompras = async (req, res) => { 
  try {

    const query = " SELECT c.idCompra, c.montoTotal, c.fechaIngreso as fechaCompra, c. fechaEnvio, c.estado, u.idUsuario, u.Nombre_Usuario, u.Apellido_Usuario, u.Email_Usuario, u.numContacto_Usuario, u.Domicilio_Usuario FROM compra c JOIN usuario u ON c.idUsuario = u.idUsuario"
   
    const [rows] = await pool.query(query);

    const comprasConDetalle = await Promise.all(rows.map(async (compra) => {
      const detalleCompra = await getDetalleCompraFromCompra(compra.idCompra)
      return {
        ...compra,
        detalleCompra: detalleCompra
      }
      
    }));
    console.log('Compras con detalle')
    console.log(comprasConDetalle);

    if (comprasConDetalle.length < 1) {
      console.error('No hay compras');
      res.status(500).json({ mensaje: 'No hay compras' });
    }
    else {
      console.log("Devolviendo compras")
      res.status(200).json(comprasConDetalle);
    }

  } catch (error) {
    console.log("PROBLEMAS CAPITAN")
    console.log(error)
    res.status(500).json({ mensaje: 'Error al buscar las compras' });
  }
}

//DETALLE COMPRA 
export const createDetalleCompra = async (req, res) => { 
  const { idCompra, idProducto, precioTotal, SubTotal, cantidad } = req.body
  
  try {
    const [rows] = await pool.query('INSERT INTO detallecompra (idCompra, idProducto, precioTotal, SubTotal, cantidad) VALUES (?,?,?,?,?)', [idCompra, idProducto, parseFloat(precioTotal), parseFloat(SubTotal), cantidad])

    if (rows.affectedRows < 1) {
      res.status(500).json({ mensaje: 'No se pudo generar la venta' });
    } else {
      res.send({ id: rows.insertId, ...req.body });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar la venta' });
  }
}

const getDetalleCompraFromCompra = async (id) => { 
      
    const queryDetalle = "SELECT dc.iddetalleCompra, dc.precioTotal, dc.SubTotal, dc.cantidad, p.nombre_Producto, p.StockProducto FROM detallecompra dc JOIN productos p ON dc.idProducto = p.idProducto WHERE dc.idCompra = ?"
    
  const [detalleCompra] = await pool.query(queryDetalle, id)
  return detalleCompra;
  
}

export const getDetalleCompra = async (req, res) => { 
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT dc.iddetalleCompra, dc.precioTotal, dc.SubTotal, dc.cantidad, p.idProducto, p.nombre_Producto, p.descripcion_Producto, p.categoria_Producto, p.StockProducto FROM detallecompra dc JOIN productos p ON dc.idProducto = p.idProducto WHERE dc.idCompra = ?', [id])

    if (rows.length < 1) {
      console.error('No hay compras');
      res.status(500).json({ mensaje: 'No hay compras' });
    } else {
      res.status(200).json(rows);
    }

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la compra' });
  }
} 

//STOCK
export const actualizarStock = async (req, res) => { 
  const productosComprados = req.body.productos;
  console.log("productosComprados");
  console.log(productosComprados);

  productosComprados.forEach(async producto => {
    console.log("producto");
    console.log(producto);
      const productoExistente = await pool.query('SELECT * FROM productos WHERE idProducto = ?', [producto.idProducto]);
    console.log("productoExistente");
    console.log(productoExistente.StockProducto);

    if (!productoExistente || productoExistente.length === 0) {
      console.log(`El producto con ID ${producto.idProducto} no existe en la base de datos`);
      return;
    }

    if (productoExistente[0].StockProducto < producto.cantidad) {
      console.log(`No hay suficiente stock para el producto con ID ${producto.idProducto}`);
      return;
    }

    
    const query = 'UPDATE productos SET StockProducto = StockProducto - ? WHERE idProducto = ?';
    await pool.query(query, [producto.cantidad, producto.idProducto]);
    console.log(`Stock actualizado para el producto ${producto.idProducto}`);
  });


}
