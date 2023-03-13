import mongoose from "mongoose";
import AuthRoles from '../utils/AuthRoles.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'

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
            minLength: [8, "Password contains minimum of 8 characters"],
            select: false
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

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods = {
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password) 
    },  

    getJwtToken: function() {
        return jwt.sign(
            {
                _id: this._id,
                role: this.role
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRES
            }
        )
    }
}

export default mongoose.model("User", userSchema)