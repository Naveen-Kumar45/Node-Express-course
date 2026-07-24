const nodemailer = require("nodemailer")
require('dotenv').config()

const verifyMail = async(req,res) => {
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : process.env.EMAIL_ID,
            pass : process.env.EMAIL_PASS
        }
    });

    const mailoptions = {
        from : process.env.EMAIL_ID,
        to : process.env.TO_EMAIL,
        subject : "Verify your email",
        html:`<h1>Welcome to our website</h1>`
    }

    const info = await transporter.sendMail(mailoptions)
    console.log(info)
    res.status(200).json({
        msg: info
    })
}

module.exports = verifyMail