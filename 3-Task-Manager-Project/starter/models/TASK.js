const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({
        workDone : {
            type : Number,
            default : 0
        },
        workLeft : {
            type : Number,
            default:100
        },
        timings : {
            type : [Number]
        }
})

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 20,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    //progress : progressSchema
})

module.exports = mongoose.model('Task', taskSchema)
