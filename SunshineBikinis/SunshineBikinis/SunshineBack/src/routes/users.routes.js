import { Router } from 'express'
import { loginUser, getUsers } from '../controllers/users.controller.js'

const router = Router()

router.get('/users', getUsers)
router.post('/users', loginUser)

export default router 