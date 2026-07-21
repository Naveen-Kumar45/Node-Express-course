const mongoose = require("mongoose")

const productImageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please provide name"]
    },
    image : [{
        type : String,
        required : [true,"Please provide image"]    
    }]},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("productImages",productImageSchema)