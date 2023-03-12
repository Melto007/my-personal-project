import mongoose from "mongoose";
import AuthRoles from '../utils/AuthRoles.js'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name field is required"],
            maxLength: [25, "Name contains less than 25 characters"]
        },
        email: {
            type: String,
            required: [true, "Email field is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password field is required"],
            minLength: [8, "Password contains minimum of 8 characters"]
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date
    },
    {
        timestamps: true
    }
)

export default mongoose.Model("User", userSchema)