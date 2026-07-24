const dns = require('node:dns') // dns is used to set the DNS servers for the application. In this case, it sets Google's public DNS servers

dns.setServers(['8.8.8.8', '8.8.4.4']) // This line sets the DNS servers to Google's public DNS servers. This can help with resolving domain names more reliably, especially in environments where the default DNS servers may be slow or unreliable.

require("dotenv").config() // This line loads environment variables from a .env file into the Node.js process. It allows developers to define configuration settings, such as database connection strings, API keys, and other sensitive information, in a separate file instead of hardcoding them in the application code. By using dotenv, you can easily manage different configurations for development, testing, and production environments without exposing sensitive data in the source code.

const express = require("express")
const app = express()

//middlewares
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const verifyMail = require('./services/verify')
 
app.use(express.static("./public"))

app.use("/mail",verifyMail)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`)
})