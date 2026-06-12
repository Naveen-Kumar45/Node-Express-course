const http = require("http");

const server = http.createServer((req,res) => {

    if (req.url === "/"){

        for (i=0 ;i < 100; i++){
            console.log(`${i}`)
        }
        res.end("Welcome to our server")
    }
    else if (req.url === "/about"){
        res.end("This is the about page of our server")
    }
    else{
        res.end("Page not found")
    }

});

const port = 5000
function startServer(){
    console.log(`Server is running on port ${port}`)
}

server.listen(port, startServer)






