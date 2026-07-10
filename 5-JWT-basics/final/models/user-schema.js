const mongoose = require("mongoose")
const validator = require("validator")
const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please provide your name"],
        maxlength : 30,
        minlength : 8
    },
    email : {
        type : String,
        required : [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please provide password"],
        minlength : 8
    },
})

const user = mongoose.model("User",userSchema)
module.exports = user