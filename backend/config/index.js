import dotenv from 'dotenv'

dotenv.config()

const index = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',

    SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USER: process.env.SMTP_MAIL_USER,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD
}

export default index