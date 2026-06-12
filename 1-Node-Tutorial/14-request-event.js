/* events.request.js is a module that handles custom events related to HTTP requests in a Node.js application. 
   It provides functionality for emitting and listening to events that occur during the processing of HTTP requests, such as request received, request completed, or request error. 
*/

const http = require("http")

const server = http.createServer()

server.on("request", (req,res) => {
   if (req.url === "/"){
         res.end("Welcome to our server")
   }
   else if (req.url === "/about"){
        res.end("This is the about page of our server")
   }
})

server.listen(3000)