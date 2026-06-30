// check whether the username and password aren't empty , if empty send error message
// if username and password exists generate JWT token
// send it to the frontend and save it in the localStorage
// setup authentication so only the request with JWT can access the dasboard



const errorCreator = require("http-errors")
const jwt = require("jsonwebtoken")


const signIn = (req,res) => {
    const { username, password } = req.body

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!

    if (!username || !password){
        throw errorCreator(401, "Please Enter Valid Credentials")
    }

    const user ={
        name : username,
        id : Date.now(),
        role : "user"
    }

    console.log(user)
    const token = jwt.sign({user},process.env.JWT_SECRET_KEY, {expiresIn : '1d'})
    console.log(token)

    res.status(200).json({
        msg : "Successfully Logged in",
        token : token
    })
}

const userDetails = (req,res) => {
    res.status(200).send("Hey, Hi There :)")
}

module.exports = {signIn, userDetails}