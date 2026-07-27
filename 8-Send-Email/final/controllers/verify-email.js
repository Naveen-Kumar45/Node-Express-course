const OTP = require("../models/otp-schema")
const createError = require("http-errors")
const statusCodes = require("http-status-codes")


const emailConfirmation = async (req,res,next) => {
    const {otp} = req.body
    const {userId,purpose} = req.verification


    if (!otp){
        throw createError(statusCodes.BAD_REQUEST, "Please Enter Verification code sent to your email")
    }
    
    const getOTP = await OTP.findOne({userId,purpose})

    if (new Date() > getOTP.expiresAt) {
        throw createError(statusCodes.GATEWAY_TIMEOUT,"Verification code expired")
    }

    const isMatch = await getOTP.compareOTP(otp)

    if (!isMatch){
        throw createError(statusCodes.BAD_REQUEST, "Verification Code you entered is Incorrect")
    }

    res.status(statusCodes.CREATED).json({
        msg : "Registration successfull... You are navigating to the homepage"
    })
}

module.exports = {emailConfirmation}