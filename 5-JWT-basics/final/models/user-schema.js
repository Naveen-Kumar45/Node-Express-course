const mongoose = require("mongoose")
const validator = require("validator")
const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name"],
        maxlength : 30,
        minlength : 8
    },
    email : {
        type : String,
        required : [true, "email"],
        validate: {
            validator: validator.isEmail,
            message: 'a valid email',
        },
        unique : true
    },
    password : {
        type : String,
        required : [true, "password"],
        minlength : 8
    },
    role : {
        type : String,
        required : [true, "role"],
    },
})

const user = mongoose.model("User",userSchema)
module.exports = user