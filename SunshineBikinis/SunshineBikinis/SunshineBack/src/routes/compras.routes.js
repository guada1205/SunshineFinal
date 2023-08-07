import { Router } from 'express'
import { getCompras, getUnaCompra, createCompra} from '../controllers/compras.controller.js'

const router = Router()

router.get('/compras', getCompras)

router.get('/compras/:id', getUnaCompra)

router.post('/compras', createCompra)

export default router 