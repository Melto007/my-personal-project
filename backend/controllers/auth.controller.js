import User from '../models/user.schema.js'
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'
import cookieOption from '../utils/cookiesOption.js'
import cookiesOption from '../utils/cookiesOption.js'
import SendMail from '../utils/SendMail.js'
import crypto from 'crypto'

/***********************************************************
 * @registerUser
 * @method - POST
 * @route - http://localhost:4000/api/auth/register
 * @description - register user for signin
 * @params - username, email, password, confirmPassword
 * @return success message
 ***********************************************************/
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body

    if(!username || !email || !password || !confirmPassword) {
        throw new CustomError("Fill all the fields", 400)
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(emailRegex)) {
        throw new CustomError("Invalid Email Address", 400)
    }

    const user = await User.findOne({ email: email })

    if(user) {
        throw new CustomError("Email already exists", 400)
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    
    if(!password.match(passwordRegex)) {
        throw new CustomError("Password contain atleast 1 special charater, number, string and minimum length of 8 character", 400)
    }

    if(password !== confirmPassword) {
        throw new CustomError("password and confirm password must be equal", 400)
    }

    const createUser = await User.create(
        {
            username: username,
            email: email,
            password: password
        }
    )

    const token = createUser.getJwtToken()
    createUser.password = undefined
    res.cookie("token", token, cookieOption)

    res.status(200).json({
        success: true,
        message: "User created successfully",
        createUser
    })
})

/***********************************************************
 * @loginuser
 * @method - get
 * @route - http://localhost:4000/api/auth/login
 * @description - login user
 * @params - email, password
 * @return user
 ***********************************************************/
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        throw new CustomError("Fill all the fields", 400)
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user) {
        throw new CustomError("Invalid Credential", 400)
    }

    const isPasswordMatches = await user.comparePassword(password)

    if(!isPasswordMatches) {
        throw new CustomError("Invalid Credential", 500)
    }

    const token = user.getJwtToken()
    user.password = undefined
    res.cookie("token", token, cookiesOption)

    res.status(200).json({
        success: true,
        message: "Login Success",
        user
    })
})

/***********************************************************
 * @logoutUser
 * @method - post
 * @route - http://localhost:4000/api/auth/logout
 * @description - logout user
 * @params - 
 * @return success message
 ***********************************************************/
export const logoutUser = asyncHandler(async(_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Successfully Logout"
    })
})

/***********************************************************
 * @forgotPassword
 * @method - post
 * @route - http://localhost:4000/api/auth/password/forgot
 * @description - forgot password for reset password
 * @params - email
 * @return send token to mail
 ***********************************************************/
export const forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body

    if(!email) {
        throw new CustomError("Fill email field", 400)
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!email.match(emailRegex)) {
        throw new CustomError("Invalid Email", 400)
    }

    const user = await User.findOne({ email })

    if(!user) {
        throw new CustomError("User not found", 400)
    }

    const resetToken = user.generateForgotPasswordToken()
    await user.save({ validateBeforeSave: false })
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`

    const text = `Your password reset token is ${resetUrl}`

    try {
        const option = {
            email: email,
            subject: 'Reset Password',
            text: text
        }
        await SendMail(option)
        res.status(200).json({
            success: true,
            message: "Email reset link send to the mail"
        })
    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        user.save({ validateBeforeSave: false })
        throw new CustomError('Reset password is failed', 400)
    }
})

/***********************************************************
 * @resetPassword
 * @method - post
 * @route - http://localhost:4000/api/auth/password/reset
 * @description - reset password for change password
 * @params - token, password, confirm password
 * @return success message
 ***********************************************************/
export const resetPassword = asyncHandler(async (req, res) => {
    const { id: token } = req.params
    const { password, confirmPassword } = req.body

    if(!token) {
        throw new CustomError('Token expired', 400)
    }

    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({ 
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()}
    })

    if(!user) {
        throw new CustomError('Password token is invalid or expired', 400)
    }

    if(password !== confirmPassword) {
        throw new CustomError("password and confirm password must be same", 400)
    }

    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    const newtoken = user.getJwtToken()
    res.cookie("token", newtoken, cookieOption)
    res.status(200).json({
        success: true,
        message: 'Reset password success'
    })
})