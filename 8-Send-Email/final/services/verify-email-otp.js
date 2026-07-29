require('dotenv').config()
const nodemailer = require('nodemailer')
const crypto = require("crypto")

//middlewares
const OTP = require('../models/otp-schema')

const verifyEmail = async (email,userID)=> {
    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.EMAIL_ID,
            pass : process.env.EMAIL_PASS
        }
    })


    await OTP.deleteOne({
        userId: userID,
        purpose: "email_verification"
    });

    const otp = crypto.randomInt(100000,1000000).toString()

    const newOTP = await OTP.create({
        userId : userID,
        purpose : "email_verification",
        otp : otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    })

    console.log("Here is saved OTP : " + newOTP)

    const verificationToken = newOTP.createVerificationToken()


    const mailOptions = {
        from : `AuthHUB <${process.env.EMAIL_ID}>`,
        to : email,
        subject : "Verify Your Email Address",
        html : `<div style="max-width:600px;margin:40px auto;padding:30px;border:1px solid #e5e5e5;border-radius:8px;font-family:Arial,sans-serif;">
                    <h2 style="color:#333;">Verify Your Email</h2>

                    <p>Hello,</p>

                <p>Thank you for creating an account.</p>

                <p>Please use the verification code below to verify your email address:</p>

                <div style="text-align:center;margin:30px 0;">
                    <span style="display:inline-block;padding:15px 30px;font-size:32px;font-weight:bold;letter-spacing:8px;background:#f4f4f4;border-radius:8px;">${otp}</span>
                </div>

                <p>This verification code will expire in <strong>5 minutes</strong>.</p>

                <p>If you did not create this account, you can safely ignore this email.</p>

                <hr style="margin:30px 0;">

                <p style="font-size:13px;color:#777;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </div>
    `}

    await transporter.sendMail(mailOptions)

    return verificationToken
}

module.exports = verifyEmail

