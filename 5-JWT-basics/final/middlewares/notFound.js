const notFound = (req,res) => {
    res.status(404).send(`<h1 style = "text-align:center">No Page Found</h1>`)
}

module.exports=notFound