import express from 'express'
const router = express.Router()
import { registerUser, loginUser, logoutUser, forgotPassword } from '../controllers/auth.controller.js'

router.post('/api/auth/register', registerUser)
router.get('/api/auth/login', loginUser)
router.post('/api/auth/logout', logoutUser)
router.post('/api/auth/password/forgot', forgotPassword)

export default router