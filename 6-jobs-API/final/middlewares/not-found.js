const notFound = (req,res) => {
    res.status(404).send(`<h1 style="text-align : center;">Page Not Found</h1>`)
}

module.exports = notFound