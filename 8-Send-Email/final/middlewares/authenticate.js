require("dotenv").config()
const user = require("../models/user-schema")
const createError = require("http-errors")
const jwt = require("jsonwebtoken")

const authentication = async (req,res,next) => {
    //console.log(req.headers)
    const Authorization = req.headers.authorization

    if (!Authorization || !Authorization.startsWith("Bearer ")){
        throw createError.Unauthorized("No Token Provided")
    }

    const token = Authorization.split(" ")[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //console.log(payload)
        //const details = await user.findById(payload.userId)
        const {userId, name, email, isVerified} = payload
        req.user = {userId, name, email, isVerified}
        next()    
    }
    catch(err){
        throw createError.Unauthorized("Authentication Failed")
    }
}

module.exports = authentication