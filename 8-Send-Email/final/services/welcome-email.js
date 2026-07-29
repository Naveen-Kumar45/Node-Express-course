require("dotenv").config()
const nodemailer = require("nodemailer")


const welcomeMail = async(email,name) => {
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : process.env.EMAIL_ID,
            pass : process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from : `"AuthHUB" <${process.env.EMAIL_ID}>`,
        to : email,
        subject : "Welcome to AuthHub! 🎉 Your Account is Ready",
        html : `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Welcome to AuthHub</title>
                </head>
                    <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                            <tr>
                                <td align="center">
                                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                                        <tr>
                                            <td style="background:#2563eb;padding:30px;text-align:center;color:#ffffff;">
                                                <h1 style="margin:0;">🎉 Welcome to AuthHub!</h1>
                                            </td>
                                        </tr>
                                    <tr>
                                        <td style="padding:35px;color:#333333;line-height:1.7;">
                                            <h2 style="margin-top:0;">Hello ${name},</h2>
                                            <p>Welcome to <strong>AuthHub</strong>! We're excited to have you join our community.</p>
                                            <p> Your account has been successfully created and your email has been verified.You can now securely access your account and enjoy all the features available.</p>
                                            
                                            <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:18px;margin:25px 0;border-radius:5px;">
                                                <strong>Here's what you can do now:</strong>
                                                <ul style="margin:12px 0 0 20px;padding:0;">
                                                    <li>Sign in securely.</li>
                                                    <li>Manage your account information.</li>
                                                    <li>Update your password whenever needed.</li>
                                                    <li>Enjoy a safe and reliable authentication experience.</li>
                                                </ul>
                                            </div>
                                            <p>If you didn't create this account, please contact our support team immediately.</p>
                                            <p>Thank you for choosing <strong>AuthHub</strong>. We look forward to providing you with a secure and seamless experience.</p>
                                            <p style="margin-top:35px;">Best Regards,<br>
                                            <strong>AuthHub Team</strong>
                                            </p>
                                        </td>
                                    </tr>
                                <tr>
                                <td style="background:#f4f6f8;padding:18px;text-align:center;font-size:13px;color:#666666;">This is an automated email. Please do not reply to this message.</td>
                            </tr>
                        </table>
                    </td>
                   </tr>
                   </table>
                </body>
            </html>`
    }

    await transporter.sendMail(mailOptions)
}

module.exports = welcomeMail