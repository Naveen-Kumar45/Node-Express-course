const express = require("express"); // express is a web framework for Node.js that simplifies the process of building web applications and APIs. It provides a set of features and tools to handle routing, middleware, and HTTP requests/responses.
const path = require("path")

const app = express() // app is an instance of the Express application. It is used to define routes, middleware, and other configurations for the web application.

app.use(express.static("./public")) // express.static is a built-in middleware function in Express that serves static files such as HTML, CSS, JavaScript, images, etc. from a specified directory. In this case, it serves files from the "public" directory.

 app.get("/", (req,res) => {
    console.log(`Received a GET request for ${req.url}`)
    const filePath = path.join(__dirname, "navbar-app", "index.html")
    res.status(200).sendFile(filePath)
}) 

app.use((req,res) => {
    console.log(`Received a request for ${req.url}`)
    res.status(404).send()
})

app.listen(5000,()=>{
    console.log("App is running")
})


