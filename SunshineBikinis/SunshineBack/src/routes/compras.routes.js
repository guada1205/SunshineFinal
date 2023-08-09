import { Router } from 'express'
import { actualizarStock, getDetalleCompra, createDetalleCompra, getCompras, getUnaCompra, createCompra} from '../controllers/compras.controller.js'

const router = Router()

router.get('/compras', getCompras)

router.get('/compras/:id', getUnaCompra)

router.post('/compras', createCompra)

router.post('/compras/detalle', createDetalleCompra)

router.get('/compras/detalle/:id', getDetalleCompra)

router.post('/actualizarStock', actualizarStock)

export default router 