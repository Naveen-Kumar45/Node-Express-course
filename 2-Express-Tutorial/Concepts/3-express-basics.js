const express = require("express"); // express is a web framework for Node.js that simplifies the process of building web applications and APIs. It provides a set of features and tools to handle routing, middleware, and HTTP requests/responses.
const app = express() // app is an instance of the Express application. It is used to define routes, middleware, and other configurations for the web application.


app.get("/", (req,res) => { // get is a method that will be executed when a GET request is made to the specified route
    console.log(`Received a GET request for ${req.url}`)
    res.status(200).send("<h1>welcome to our Page</h1>")  
})

app.get("/about", (req,res) => { 
    console.log(`Received a GET request for ${req.url}`)
    res.status(200).send("<h1>About Page</h1>")
})

app.get('/api/data', (req,res) => {
    console.log(`Received a GET request for ${req.url}`)
    const data = {
        Name : "Mahindra Singh Dhoni",
        Role : "Indian Cricket Team Captain",
        Age : 34
    }
    res.status(200).json(data)
})

app.use((req,res) => { // use is a middleware function that will be executed for every request that doesn't match any of the above routes
    console.log(`Received a request for ${req.url}`)
    res.status(404).send("<h1>Page Not Found</h1>")
})


app.listen(5000,()=>{
    console.log("App is running")
})


//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen