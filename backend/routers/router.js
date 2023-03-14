import express from 'express'
const router = express.Router()
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from '../controllers/auth.controller.js'

router.post('/api/auth/register', registerUser)
router.get('/api/auth/login', loginUser)
router.post('/api/auth/logout', logoutUser)
router.post('/api/auth/password/forgot', forgotPassword)
router.post('/api/auth/password/reset/:id', resetPassword)

export default router