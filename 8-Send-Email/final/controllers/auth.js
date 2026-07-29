const bcrypt = require("bcryptjs")
const createError = require("http-errors")

//user schema
const user = require('../models/user-schema')

//email services
const verifyEmail = require("../services/verify-email-otp")


const registerMethod =async(req,res) => {
    console.log(req.body)
    const {name, email, password} = req.body
    
    /*if (!name || !email || !password){
        throw createError.BadRequest("Please enter name,email and password")
    }*/

    /*const salt = await bcrypt.genSalt(10) 
    console.log(salt)
    const hashPass = await bcrypt.hash(password,salt)
    const hashed = {name, email, password: hashPass};*/

    const newUser = await user.create(req.body)

    const verificationToken = await verifyEmail(newUser.email,newUser._id)

    res.status(201).json({user : newUser.name,
        verificationToken : verificationToken,
    })
}

const loginMethod = async(req,res) => {
    //console.log(req.body)
    const {email, password} = req.body
    console.log(req.body)

    if (!email || !password) {
        throw createError.BadRequest("Please provide valid credentials")
    }

    const validateUser = await user.findOne({email})

    if (!validateUser){
        throw createError.Unauthorized("The email you entered is incorrect. Please try again")
    }

    const isMatch = await validateUser.comparePassword(password)

    if (!isMatch){
        throw createError.Unauthorized("The password you entered is incorrect. Please try again")
    }

    if (validateUser.isVerified == false){
        const verificationToken = await verifyEmail(validateUser.email,validateUser._id)
        return res.status(403).json({
            verified: false,
            verificationToken,
            message: "Your email isn't verified. We've sent a new verification code."
        });
    }

    const token = validateUser.createAuthJWT()
    res.status(200).json({user : { name : validateUser.name}, authToken : token})
}

const dashboard = (req,res) => {
    console.log(req.user)

    res.status(200).json({name :req.user.name, email : req.user.email, isVerified: req.user.isVerified})
}

module.exports = {registerMethod, loginMethod, dashboard}
