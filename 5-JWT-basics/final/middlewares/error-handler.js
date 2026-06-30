const errorHandler = (err,req,res,next) => {
    res.status(err.statusCode || err.status || 500).send(`Login Credentials are incorrect`)
}

module.exports = errorHandler