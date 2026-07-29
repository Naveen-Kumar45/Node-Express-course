const JWT = require('jsonwebtoken')
const StatusCodes = require("http-status-codes")
const createError = require("http-errors")

const verification = async (req,res,next) => {
    const Authorization = req.headers.authorization

    if (!Authorization || !Authorization.startsWith("Bearer ")){
        const error = !Authorization ? "No Token Provided" : "Invalid Token"
        throw createError(StatusCodes.UNAUTHORIZED, error)
    }

    const token = Authorization.split(" ")[1]

    try {
        const payload = JWT.verify(token,process.env.JWT_SECRET_KEY)
        req.verification = payload
        next()
    }
    catch(err){
        console.log(err)
        throw createError(StatusCodes.UNAUTHORIZED,"Session Expired")
    }
}

module.exports = verification

