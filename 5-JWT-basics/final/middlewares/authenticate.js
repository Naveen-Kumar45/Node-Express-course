const errorCreator = require("http-errors")
const jwt = require("jsonwebtoken")

const authenticate = async (req,res,next) => {
    //console.log(req.headers)
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith("Bearer ")){
        throw errorCreator.Unauthorized("Invalid Token")
    }

    const token = authorization.split(" ")[1]
    //console.log(token)

    try{ 
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded)
        const {name , email, role , iat , exp} = decoded
        req.user = {name , email, role, iat, exp}
        next()

    }catch(err){
        throw errorCreator.Unauthorized("Not authorized to access this route")
    }
    
}

module.exports = authenticate