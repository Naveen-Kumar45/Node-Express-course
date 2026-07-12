// check whether the username and password aren't empty , if empty send error message
// if username and password exists generate JWT token
// send it to the frontend and save it in the localStorage
// setup authentication so only the request with JWT can access the dasboard

const User = require("../models/user-schema.js")
const StatusCodes = require("http-status-codes")
const errorCreator = require("http-errors")
const jwt = require("jsonwebtoken")

const signUp = async (req,res) => {
    //console.log(req.body)

    const user = await User.create(req.body)

    const token = await jwt.sign({
        userID : user._id,
        name : user.name
    },
    process.env.JWT_SECRET_KEY, 
    {
        expiresIn : '30d'
    })

    res.status(StatusCodes.CREATED).json({
        msg : "Registration complete. Redirecting you to your dashboard",
        token : token
    })
}

const signIn = async (req,res) => {
    const {name, email, password } = req.body

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!

    if ((!name && !email) || !password){
        let invalid = (!name && !email) && !password? "username and password" :  !name && !email ? "username" : "password"
        throw errorCreator.BadRequest( `Please enter ${invalid}`)
    }

    const queryObject = {}

    if (name){
        queryObject.name = name
    }

    if (email){
        queryObject.email = email
    }

    const user = await User.findOne(queryObject)
    //console.log(user)

    if (!user){
        throw errorCreator.Unauthorized("The email or username you entered is incorrect. Please try again")
    }


    if(user.password !== password){
        throw errorCreator.Unauthorized("The password you entered is incorrect. Please try again")
    }

    const token = jwt.sign({
        name : user.name,
        email : user.email,
        role : user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : '1h'
    })

    res.status(200).json({
        msg : "Success! Redirecting you to your Dashboard",
        token : token
    })
}

const dashboard = (req,res) => {

    res.status(StatusCodes.ACCEPTED).json({name :req.user.name, email : req.user.email, role : req.user.role, iat : req.user.iat, exp : req.user.exp})
}

module.exports = {signUp, signIn, dashboard}