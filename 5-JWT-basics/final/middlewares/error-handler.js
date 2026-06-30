const errorHandler = (err,req,res,next) => {
    res.status(err.statusCode || err.status || 500).send(err.message)
}

module.exports = errorHandler