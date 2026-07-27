const User = require("../models/user-schema")
const forgotPasswordemail = require("../services/forgot-password-email")
const createError = require("http-errors")
const StatusCodes = require("http-status-codes")

const forgotPassword = async (req,res) => {
    const {email} = req.body

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw createError(StatusCodes.NOT_FOUND,"We couldn't find an account with this email address")
    }

    const resetToken =await forgotPasswordemail(email)

    res.status(200).json({
        msg : "A password reset link had been sent to your email",
        resetToken
    })
}

const changePassword = async (req,res) => {
    const {userId, purpose} = req.reset
    const {newpassword , confirmpassword} = req.body

    if (purpose !== 'password_reset') {
        throw createError(StatusCodes.UNAUTHORIZED, 'Invalid password reset token')
    }

    if (!newpassword || !confirmpassword) {
        throw createError(StatusCodes.BAD_REQUEST, "Please enter new password and then confirm password")
    }

    if (newpassword !== confirmpassword) {
        throw createError(StatusCodes.BAD_REQUEST, "Make sure to match new password and confirm password")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw createError(StatusCodes.NOT_FOUND, "User not found")
    }

    user.password = confirmpassword
    await user.save()

    res.status(StatusCodes.OK).json({
        msg : "Your password has been changed. Now you are redirecting to login page"
    })

}

module.exports = {forgotPassword, changePassword}
