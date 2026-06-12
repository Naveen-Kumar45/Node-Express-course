let http = require('http')
let fs = require('fs')


const server = http.createServer((req, res) => {
    //const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)
    const stream =fs.createReadStream('./content/big.txt', 'utf8')
    stream.on('open',() => {
        stream.pipe(res)
    })
    stream.on('error', (err) => {
        res.end(err)
    }) 
})

server.listen(3000)