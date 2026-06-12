const express = require("express")
const app = express()


const logger = (req,res,next) => {
    let method = req.method
    let URL = req.url
    let time = new Date().toLocaleTimeString()
    console.log(method, URL, time)
    next()
}

app.get("/",logger,(req,res) => {
    res.send("Hey, this is middleware concept :)")
})

app.get("/info",logger,(req,res) => {
    res.send(`Hey, you are currently looking for ${req.url} and the time is ${new Date().toLocaleTimeString()}`)
})


app.use((req,res) => {
    res.status(404).send('<h1 style="text-align:center;">Page Not Found </h1>')
})

app.listen(5000)