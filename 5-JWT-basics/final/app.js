require("dotenv")


const express = require("express")
const app = new express()

//middlewares
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/error-handler")
const routeAuth = require("./routes/auth.js")
app.use(express.json())



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start= async()=> {
    try{
        app.listen(PORT,console.log(`Server is running on the PORT ${PORT}`))
    }
    catch(err){
        console.log(err)
    }
}

start()