// The http module is a built-in module in Node.js that allows you to create an HTTP server and handle HTTP requests and responses. It provides a simple way to create a web server that can listen for incoming requests and send responses back to the client.
const http = require('http');

// createServer is a method provided by the http module that creates an HTTP server. It takes a callback function as an argument, which is executed every time a request is made to the server. The callback function receives two parameters: req (the incoming request) and res (the response object that you can use to send data back to the client).
const server = http.createServer((req,res) => {

    res.end("Hello World") // end is a method of the response object that signals the end of the response. It can also be used to send data back to the client. In this case, it sends the string "Hello World" as the response body.

    if (req.url === '/'){
        res.write("Welcome to our server") // write is a method of the response object that allows you to send data back to the client. It can be called multiple times to send multiple pieces of data before ending the response with res.end().
        const data ={
            name : "Heisenberg",
            age : 50,
            occupation : "Chemistry Teacher"
        }
        res.writeHead(200, {'Content-Type': 'application/json'}) // writeHead is a method of the response object that allows you to set the HTTP status code and headers for the response. In this case, it sets the status code to 200 (OK) and the Content-Type header to 'application/json', indicating that the response body will be in JSON format.
        res.end(JSON.stringify(data))
    }

    else if (req.url === '/about'){
        res.write("This is the about page of our server")
        res.end()
    }

    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(`
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>
            <img src="https://http.cat/404" alt="404 Not Found" style='content-center; display: block; margin: 0 auto;'>`)
    }
    console.log(req.url) // The url property of the request object contains the URL of the incoming request. It is a string that represents the path and query parameters of the request. In this code, it is used to determine which response to send back to the client based on the requested URL.
    console.log(req.method) // The method property of the request object contains the HTTP method of the incoming request (e.g., GET, POST, PUT, DELETE). It is a string that indicates the type of request being made. In this code, it is logged to the console for debugging purposes.
    console.log(req.headers) // The headers property of the request object contains an object representing the headers of the incoming request. Each header is a key-value pair, where the key is the name of the header and the value is the corresponding value. In this code, it is logged to the console for debugging purposes.
    console.log(req.rawHeaders) // The rawHeaders property of the request object contains an array of the raw header names and values of the incoming request. It is an array where each header name is followed by its corresponding value. In this code, it is logged to the console for debugging purposes.
})


server.listen(3000) // The listen method is used to start the server and have it listen for incoming requests on a specified port. In this case, the server is set to listen on port 3000. When the server is running, you can access it by navigating to http://localhost:3000 in your web browser or using tools like curl or Postman to send requests to the server.