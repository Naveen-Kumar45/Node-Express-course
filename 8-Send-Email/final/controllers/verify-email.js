const OTP = require("../models/otp-schema")
const User = require("../models/user-schema")
const createError = require("http-errors")
const statusCodes = require("http-status-codes")

//email services
const verifyEmail = require("../services/verify-email-otp")
const welcomeMail = require("../services/welcome-email")

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

    const user = await User.findById(userId)
    user.isVerified = true;
    await user.save();

    const authToken = await user.createAuthJWT()

    res.status(statusCodes.CREATED).json({
        msg : "Registration successfull... You are navigating to the homepage",
        authToken,
    })
    welcomeMail(user.email,user.name)

}

const resendVerification = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw createError(
            statusCodes.NOT_FOUND,
            "No Account is registered with this email"
        );
    }

    if (user.isVerified) {
        throw createError(
            statusCodes.BAD_REQUEST,
            "Email is already verified"
        );
    }

    const verificationToken = await verifyEmail(
        user.email,
        user._id
    );

    res.status(statusCodes.OK).json({
        verificationToken,
        msg: "A new verification code has been sent."
    });
};

module.exports = {emailConfirmation, resendVerification}