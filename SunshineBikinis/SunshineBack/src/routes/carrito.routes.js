import { Router } from 'express'
import { vaciarCarrito, removeCarrito, deleteCarrito, getCarrito, addCarrito} from '../controllers/carrito.controller.js'

const router = Router()

router.get('/carrito/:id', getCarrito)

router.post('/carrito',  addCarrito)

router.delete('/carrito/:idProducto/:idUsuario', deleteCarrito)

router.delete('/carrito/:idUsuario', vaciarCarrito)

router.patch('/carrito', removeCarrito)
export default router 