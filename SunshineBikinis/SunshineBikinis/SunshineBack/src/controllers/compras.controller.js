import { pool } from '../db.js'

export const createCompra = async (req, res) => { 
  const { idUsuario, montoTotal } = req.body
  
    try {   
    const [rows] = await pool.query('INSERT INTO compra (idUsuario, montoTotal) VALUES (?,?)', [idUsuario, parseFloat(montoTotal)])
    
      res.send({ id: rows.insertId, ...req.body });
  } catch(err){
    res.status(500).json({ message: err.message })
  }
}

export const getUnaCompra = async (req, res) => { 

} 

export const getCompras = async (req, res) => { 

}