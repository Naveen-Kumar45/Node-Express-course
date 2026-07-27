require("dotenv").config()
const nodemailer = require("nodemailer")
const User = require("../models/user-schema")

const forgotPasswordemail= async (email) => {
    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.EMAIL_ID,
            pass : process.env.EMAIL_PASS
            }
        })

    const user = await User.findOne({email})

    const resetToken = user.createresetJWT()
    const frontendHost = process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 3000}`
    const resetLink = `${frontendHost}/html/reset-password.html?token=${encodeURIComponent(resetToken)}`

    const mailOptions = {
        from: `"AuthHUB" <${process.env.EMAIL_ID}>`,
        to: email,
        subject: "Reset Your Password",
        html: `
        <div style="max-width:600px;margin:40px auto;padding:30px;border:1px solid #e5e5e5;border-radius:8px;font-family:Arial,sans-serif;">
            <h2 style="color:#333;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset the password for your <strong>AuthHUB</strong> account.</p>
            <p>Click the button below to create a new password.</p>
            <div style="text-align:center;margin:35px 0;">
                <a href="${resetLink}" style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; display:inline-block; font-size:16px; font-weight:bold;">
                Reset Password
                </a>
            </div>
            <p>This password reset link will expire in <strong>10 minutes</strong>.</p>
            <p>If the button doesn't work, copy and paste the following URL into your browser:</p>

            <p style="word-break:break-all;color:#2563eb;">${resetLink}</p>

            <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

           <hr style="margin:30px 0;">

           <p style="font-size:13px;color:#777;">This is an automated email from AuthHUB. Please do not reply to this message.</p>

    </div>` 

    };

    await transporter.sendMail(mailOptions)

    return resetToken
    
}

module.exports = forgotPasswordemail