const logger = (req,res,next) => {
    let method = req.method
    let URL = req.url
    let time = new Date().toLocaleTimeString()
    console.log(method, URL, time)
    next()
}

module.exports = logger