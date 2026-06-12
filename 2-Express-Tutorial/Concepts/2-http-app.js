const http = require('http');
const {readFileSync} = require('fs')

const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/style.css')
const logoImage = readFileSync('./navbar-app/logo.svg')
const appJs = readFileSync('./navbar-app/script.js')

const server = http.createServer((req,res) => {
    const url = req.url;
    console.log(`Received a request for ${url}`)

    if (url === "/"){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(homePage)
        res.end()
    }
    else if (url === "/about"){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else if (url === "/style.css"){
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.end(homeStyles)
    } 
    else if (url === "/logo.svg"){
        res.writeHead(200, {'Content-Type': 'image/svg+xml'})
        res.end(logoImage)
    } 
    else if (url === "/script.js"){
        res.writeHead(200, {'Content-Type': 'application/javascript'})
        res.end(appJs)
    } 
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<h1>404 Not Found</h1>')
        res.end()
    }

});

server.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})
