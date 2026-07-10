const dns = require('node:dns') // dns is used to set the DNS servers for the application. In this case, it sets Google's public DNS servers

dns.setServers(['8.8.8.8', '8.8.4.4']) // This line sets the DNS servers to Google's public DNS servers. This can help with resolving domain names more reliably, especially in environments where the default DNS servers may be slow or unreliable.

require("dotenv").config()


const express = require("express")
const app = new express()

//middlewares
const connectDB = require("./db/connect.js")
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/error-handler")
const routeAuth = require("./routes/auth.js")

app.use(express.static("./public"))
app.use(express.json())

app.use("/api/v1",routeAuth)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start= async()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB")
        app.listen(PORT,console.log(`Server is running on the PORT ${PORT}`))
    }
    catch(err){
        console.log(err)
    }
}

start()