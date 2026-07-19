const StatusCodes = require("http-status-codes")

const errorHandler = (err,req,res,next) => {
    //console.log(err)
    let customError = {
        msg : err.message || "Something went wrong please try again later",
        status : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err.code === "LIMIT_FILE_SIZE"){
        customError.msg = "File size is too large. Please upload file less than 5MB",
        customError.status = StatusCodes.REQUEST_TOO_LONG
    }

    if (err.code === "LIMIT_FILE_COUNT"){
        customError.msg = "File limit exceeded. Please upload maximum 3 files",
        customError.status = StatusCodes.REQUEST_TOO_LONG
    }

    res.status(customError.status).json({
        msg : customError.msg
    })
}

module.exports = errorHandler