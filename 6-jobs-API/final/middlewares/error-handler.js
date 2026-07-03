const errorHandler = (err,req,res,next) => {
    res.status(err.status || err.statusCode || 500 ).send(err.message)
}

module.exports = errorHandler