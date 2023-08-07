import { Router } from 'express'
import { upload, getProductos, getUnProducto, createProducto, updateProducto, deleteProducto} from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:id', getUnProducto)

router.post('/productos', upload.single('thumbnail'), createProducto)

router.patch('/productos/:id', updateProducto)

router.delete('/productos/:id', deleteProducto)

export default router 