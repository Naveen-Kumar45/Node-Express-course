const StatusCodes = require("http-status-codes")

const notFound = (req,res) => {
    res.status(StatusCodes.NOT_FOUND).send(`<h1 style="text-align : center;">Page Not Found</h1>`)
}

module.exports = notFound