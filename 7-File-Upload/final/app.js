const dns = require('node:dns') // dns is used to set the DNS servers for the application. In this case, it sets Google's public DNS servers

dns.setServers(['8.8.8.8', '8.8.4.4']) // This line sets the DNS servers to Google's public DNS servers. This can help with resolving domain names more reliably, especially in environments where the default DNS servers may be slow or unreliable.

require("dotenv").config() // This line loads environment variables from a .env file into the Node.js process. It allows developers to define configuration settings, such as database connection strings, API keys, and other sensitive information, in a separate file instead of hardcoding them in the application code. By using dotenv, you can easily manage different configurations for development, testing, and production environments without exposing sensitive data in the source code.

const fileUpload = require("express-fileupload") // fileUpload is a middleware that allows us to handle file uploads in Express.js applications. It simplifies the process of receiving files from clients and makes them accessible through the `req.files` object. It is commonly used in scenarios where users need to upload files, such as images, documents, or other media, to the server. By using this middleware, developers can easily manage file uploads without having to manually parse multipart/form-data requests.
const path = require("path")

const express = require("express")
const app = express()


//middlewares
const fileroute = require("./routes/files.js")
const errorHandler = require("./middlewares/error-handler.js")
const notFound = require("./middlewares/not-found.js")
const connectDB = require("./db/connect.js") // This line imports the connectDB function from the ./db/connect.js file. The connectDB function is responsible for establishing a connection to the MongoDB database using Mongoose. It takes a database connection string (URL) as an argument and returns a promise that resolves when the connection is successfully established. By importing this function, the application can easily connect to the database when starting up, ensuring that the application has access to the necessary data storage and retrieval capabilities.

app.use(express.static("./public")) // This line sets up a static file serving middleware for the Express application. It allows clients to access files stored in the ./public directory by making requests to the server. For example, if there is a file named index.html in the ./public directory, it can be accessed via http://yourdomain.com/index.html. This is useful for serving static assets like HTML, CSS, JavaScript, and images directly to users without requiring additional route handling or processing.
app.use("/uploads",express.static("./uploads")) // This line sets up a static file serving middleware for the /uploads route. It allows clients to access files stored in the ./uploads directory by making requests to /uploads. For example, if a file named image.jpg is uploaded and saved in the ./uploads directory, it can be accessed via http://yourdomain.com/uploads/image.jpg. This is useful for serving uploaded files directly to users without requiring additional route handling or processing.
app.use(express.json()) // This line adds a middleware to the Express application that parses incoming JSON payloads in the request body. It allows the server to automatically parse and convert JSON data sent by clients into JavaScript objects, making it easier to work with the data in route handlers. Without this middleware, the server would not be able to understand JSON data sent in requests, and developers would need to manually parse the request body.

//routes
app.use("/api/v1",fileroute)

//error Hanlers
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000; // This line sets the port on which the Express application will listen for incoming requests. It first checks if there is a PORT environment variable defined (which is common in deployment environments like Heroku). If not, it defaults to port 5000. This allows for flexibility in configuring the application to run on different ports based on the environment.

app.listen(PORT, async ()=> {
    try{
        await connectDB(process.env.MONGO_URI) // This line calls the connectDB function with the MongoDB connection string stored in the MONGO_URI environment variable. It establishes a connection to the MongoDB database when the server starts listening for incoming requests. By connecting to the database at this point, the application ensures that it has access to the necessary data storage and retrieval capabilities before handling any client requests.
        console.log("Connected to the DB....") 
        console.log(`Server is running on PORT ${PORT}`)
    }
    catch(err){
        console.log(err)
    }
})
