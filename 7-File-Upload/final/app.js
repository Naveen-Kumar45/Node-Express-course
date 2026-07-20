const fileUpload = require("express-fileupload") // fileUpload is a middleware that allows us to handle file uploads in Express.js applications. It simplifies the process of receiving files from clients and makes them accessible through the `req.files` object. It is commonly used in scenarios where users need to upload files, such as images, documents, or other media, to the server. By using this middleware, developers can easily manage file uploads without having to manually parse multipart/form-data requests.
const path = require("path")

const express = require("express")
const app = express()



//middlewares
const fileroute = require("./routes/files.js")
const errorHandler = require("./middlewares/error-handler.js")
const notFound = require("./middlewares/not-found.js")
const PORT = process.env.PORT || 5000; // This line sets the port on which the Express application will listen for incoming requests. It first checks if there is a PORT environment variable defined (which is common in deployment environments like Heroku). If not, it defaults to port 5000. This allows for flexibility in configuring the application to run on different ports based on the environment.


app.use(express.static("./public")) // This line sets up a static file serving middleware for the Express application. It allows clients to access files stored in the ./public directory by making requests to the server. For example, if there is a file named index.html in the ./public directory, it can be accessed via http://yourdomain.com/index.html. This is useful for serving static assets like HTML, CSS, JavaScript, and images directly to users without requiring additional route handling or processing.
app.use("/uploads",express.static("./uploads")) // This line sets up a static file serving middleware for the /uploads route. It allows clients to access files stored in the ./uploads directory by making requests to /uploads. For example, if a file named image.jpg is uploaded and saved in the ./uploads directory, it can be accessed via http://yourdomain.com/uploads/image.jpg. This is useful for serving uploaded files directly to users without requiring additional route handling or processing.
app.use(express.json()) // This line adds a middleware to the Express application that parses incoming JSON payloads in the request body. It allows the server to automatically parse and convert JSON data sent by clients into JavaScript objects, making it easier to work with the data in route handlers. Without this middleware, the server would not be able to understand JSON data sent in requests, and developers would need to manually parse the request body.

//routes
app.use("/api/v1",fileroute)

//error Hanlers
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})
