const user = require('../models/user-schema')
const bcrypt = require("bcryptjs")
const createError = require("http-errors")

const register =async(req,res) => {
    //console.log(req.body)
    const {name, email, password} = req.body
    
    /*if (!name || !email || !password){
        throw createError.BadRequest("Please enter name,email and password")
    }*/

    /*const salt = await bcrypt.genSalt(10) 
    console.log(salt)
    const hashPass = await bcrypt.hash(password,salt)
    const hashed = {name, email, password: hashPass};*/

    const newUser = await user.create(req.body)
    const token =  newUser.createJWT()
    res.status(201).json({user : newUser.name,
        token
    })
}

const login = async(req,res) => {
    //console.log(req.body)
    const {email, password} = req.body

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

    const token = validateUser.createJWT()
    res.status(200).json({user : { name : validateUser.name}, token : token})
}

module.exports = {register, login}
