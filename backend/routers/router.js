import express from 'express'
const router = express.Router()
import { registerUser, loginUser } from '../controllers/auth.controller.js'

router.post('/api/auth/register', registerUser)
router.get('/api/auth/login', loginUser)

export default router