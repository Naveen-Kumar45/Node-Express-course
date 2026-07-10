const StatusCodes = require("http-status-codes")

const notFound = (req,res) => {
    res.status(StatusCodes.NOT_FOUND).send(`<h1 style = "text-align:center">No Page Found</h1>`)
}

module.exports=notFound