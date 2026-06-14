const express = require("express")
const app = express()
const morgan = require("morgan")
const logger = require("./logger.js")
const authorize = require("./authorize.js")

//  req => middleware => res



/*const license = (req,res,next) => {
    res.send("Hello world")
}*/

//app.use(morgan("tiny"))
//app.use(morgan("short"))
//app.use(morgan("dev"))
app.use(morgan("combined"))
//app.use(morgan("common"))
app.use([logger,authorize])

app.get("/",(req,res) => {
    res.send("Hey, this is middleware concept :)")
})

app.get("/info",(req,res) => {
    res.send(`Hey, you are currently looking for ${req.url} and the time is ${new Date().toLocaleTimeString()}`)
})
//app.use(logger)
app.get("/info/careers",(req,res) => {
    res.send("Hey, Welcome to the Career Page")
})

app.get("/learning",(req,res) => {
    res.send("Hey, Here is the results for what you have been searching")
    console.log(req.user)
})


app.listen(5000, ()=> {
    console.log("Server is listening on the port 5000")
}) 

