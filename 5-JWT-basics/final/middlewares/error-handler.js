const errorHandler = (err,req,res,next) => {
    const customError = {
        status : err.statusCode || 500,
        msg : err.message || "Something went wrong please try again later"
    }
}

module.exports = errorHandler