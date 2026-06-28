const errorHandler = async (err,req,res,next) => {
    res.status(err.statusCode || 500).send(err.message)
    console.log(err)
}

module.exports = errorHandler