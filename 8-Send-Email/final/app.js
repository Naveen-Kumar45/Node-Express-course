const dns = require('node:dns') // dns is used to set the DNS servers for the application. In this case, it sets Google's public DNS servers

dns.setServers(['8.8.8.8', '8.8.4.4']) // This line sets the DNS servers to Google's public DNS servers. This can help with resolving domain names more reliably, especially in environments where the default DNS servers may be slow or unreliable.

require("dotenv").config() // This line loads environment variables from a .env file into the Node.js process. It allows developers to define configuration settings, such as database connection strings, API keys, and other sensitive information, in a separate file instead of hardcoding them in the application code. By using dotenv, you can easily manage different configurations for development, testing, and production environments without exposing sensitive data in the source code.

const express = require("express")
const app = express()


//extra security packages   // below packages are used to enhance the security of the application by adding various protections against common web vulnerabilities and attacks.
const helmet = require("helmet") // Helmet helps secure Express apps by setting various HTTP headers. It can help protect against some well-known web vulnerabilities by setting appropriate HTTP headers.
const cors = require("cors") // CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. The cors package provides middleware to enable CORS with various options.
const { xss } = require("express-xss-sanitizer") // This package is used to sanitize user input and prevent XSS (Cross-Site Scripting) attacks. It removes potentially malicious code from user input, helping to protect the application from XSS vulnerabilities.
const rateLimit = require("express-rate-limit") // This package is used to limit repeated requests to public APIs and/or endpoints such as password reset. It helps prevent brute-force attacks and denial-of-service attacks by limiting the number of requests a client can make in a given time frame.


//middlewares
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const verifyMail = require('./services/verify-email-otp')
const connectDB = require("./db/connect")
const authRoute = require("./routes/auth")

//extra security layers
app.set('trust proxy',1); // This line is used to tell the Express application that it is behind a proxy (like a load balancer or reverse proxy) and to trust the first proxy in the chain. This is important for applications that are deployed behind proxies, as it allows Express to correctly identify the client's IP address and other connection details. The '1' indicates that only the first proxy should be trusted.
app.use(rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max : 100, //limit each IP to 100 requests per windowMs
}))  // This middleware limits each IP address to a maximum of 100 requests per 15-minute window. If an IP exceeds this limit, it will receive a 429 Too Many Requests response. This helps protect the application from abuse and potential denial-of-service attacks.
app.use(express.json());
app.use(express.static("./public"));
app.use(helmet());
app.use(cors());
app.use(xss());



//routes
app.use("/api/v1/auth",authRoute)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB....")
        app.listen(PORT, ()=> {
            console.log(`Server running on the port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}
start()