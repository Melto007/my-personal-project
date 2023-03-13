import User from '../models/user.schema.js'
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'
import cookieOption from '../utils/cookiesOption.js'

/***********************************************************
 * @registerUser
 * @method - POST
 * @route - http://localhost:4000/auth/register
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