import transporter from '../config/transport.config.js'
import config from '../config/index.js'

const SendMail = async (option) => {
    const message = {
        from: config.SMTP_MAIL_SENDER,
        to: option.email,
        subject: option.subject,
        text: option.text
    }
    await transporter.sendMail(message);
}
export default SendMail