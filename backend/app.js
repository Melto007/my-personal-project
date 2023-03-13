import express from 'express'
const app = express()
import router from './routers/router.js'
import cookieParser from 'cookie-parser'

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(router)

export default app