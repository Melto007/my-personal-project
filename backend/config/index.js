import dotenv from 'dotenv'

dotenv.config()

const index = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: process.env.JWT_EXPIRES || '7d'
}

export default index