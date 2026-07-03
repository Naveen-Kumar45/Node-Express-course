require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide name'],
        maxlength : 50,
        minlength : 3,
    },
    email : {
        type : String,
        required : [true, 'Please provide name'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',],
        unique: true,
    },
    password : {
        type : String,
        required : [true, 'Please provide password'],
        minlength : 8,
        //maxlength : 12,
    },
})



userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT =  function(){
    return jwt.sign ({
        userId : this._id,
        name : this.name,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function(password){
    const match = await bcrypt.compare(password,this.password)
    return match
}

const user = mongoose.model("User",userSchema)

module.exports = user