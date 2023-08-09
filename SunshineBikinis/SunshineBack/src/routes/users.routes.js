import { Router } from 'express'
import { updateDomicilioUser, updateUser, registerUser, loginUser, getUsers } from '../controllers/users.controller.js'

const router = Router()

router.get('/users', getUsers)
router.post('/users', loginUser)
router.post('/users/register', registerUser)
router.patch('/users/:id', updateUser)
router.patch('/users/domicilio/:id', updateDomicilioUser)

export default router 