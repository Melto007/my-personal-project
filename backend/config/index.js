import dotenv from 'dotenv'

dotenv.config()

const index = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE
}

export default index