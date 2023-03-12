import mongoose from 'mongoose'
import app from './app.js'
import config from './config/index.js'

(async () => {
    try {
        await mongoose.connect(config.DATABASE)
        console.log("DB is connected successfully")

        app.on('error', (error) => {
            console.log("DB not connected")
            throw error
        })

        const onListening = () => {
            console.log(`Listening on PORT ${config.PORT}`)
        }

        app.listen(config.PORT, onListening)

    } catch (error) {
        console.log("ERROR", error)
        throw error
    }
})()