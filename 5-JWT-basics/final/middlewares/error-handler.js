const StatusCodes = require("http-status-codes")

const errorHandler = (err,req,res,next) => {
    const customError = {
        status : err.statusCode || 500,
        msg : err.message || "Something went wrong please try again later"
    }

    if (err.name === 'ValidationError'){
        customError.status = StatusCodes.BAD_REQUEST
        const data = Object.values(err.errors).map((item)=>{
            return item.message
        }).join(",")
        customError.msg = `Please provide ${data}`
    }

    if (err && err.code === 11000){
        customError.msg = `The ${Object.keys(err.keyValue)} had been already taken please choose another one`
        customError.status = StatusCodes.CONFLICT
    }


    

    res.status(customError.status).send(customError.msg)
}

module.exports = errorHandler