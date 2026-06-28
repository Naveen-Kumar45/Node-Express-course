const notFound = (req,res) => {
    res.status(404).json("The Route doesn't exist")
}

module.exports = notFound