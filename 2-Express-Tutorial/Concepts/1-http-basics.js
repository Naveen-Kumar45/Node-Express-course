 /* const http = require('http');

const server = http.createServer((req,res) => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
            url : req.url,
            method : req.method,
            headers : req.headers,
            body : req.body
        }))
})


server.listen(5000, serverStarted)

function serverStarted() {
    console.log('Server is listening on port 5000...')
} */

const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req.method)
    console.log("Server received a request")
    const url = req.url

    // home page
    if (url === "/"){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(`<h1>Welcome to our Website</h1>`)
    }
    // about page
    else if (url === "/about"){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(`<h1>About Us</h1>
            <p>This is the about page of our website.</p>`)
    }
    // API endpoint to return JSON data
    else if (url === "/api/data"){
        res.writeHead(200, {'Content-Type' : 'application/json'})
        const data = {
            name : "Siddhanth Nandan Saaho",
            age : 37,
            occupation : "CEO of Roy Group"

        }
        res.end(JSON.stringify(data))


    }
    // 404 Not Found for any other URL
    else{
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(`<h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>`)
    }
})

server.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})



fetch("http://localhost:5000/api/data")
        .then(function(response){
           return response.json();
        })
        .then(function(data){
            console.log(data)
        }) 
