const StatusCodes = require('http-status-codes');

const errorHandler = (err, req, res, next) => {

    let customError = {
        msg : err.message || "Something went wrong please try again later",
        status : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }





    res.status(customError.status).json({
        msg : customError.msg
    })
}

module.exports = errorHandler