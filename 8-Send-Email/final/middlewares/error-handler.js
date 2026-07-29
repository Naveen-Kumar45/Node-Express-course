const StatusCodes = require("http-status-codes")


const errorHandler = (err,req,res,next) => {

    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || "Something went wrong try again later"
    }


    if (err.name === "ValidationError"){
        const data = Object.values(err.errors).map((item) => 
            item.message
        ).join(",")
        customError.msg = data
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err && err.code === 11000){
        customError.msg = `The ${Object.keys(err.keyValue)} had been already taken please choose another one`
        customError.statusCode = StatusCodes.CONFLICT
    }



    res.status(customError.statusCode).json({msg : customError.msg})
}

module.exports = errorHandler