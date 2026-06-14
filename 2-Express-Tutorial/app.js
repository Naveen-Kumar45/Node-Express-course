const express = require('express')
const app = new express()
const {products, people} = require('./data.js')

let users=[]

app.use(express.static("./methods-public"))
app.use(express.urlencoded({extended : false}))
app.get('/api/people',(req,res)=>{
    console.log(req.body)
    console.log(req.url)
    res.send({success : true,
        body : people
    })
})

app.post('/login',(req,res)=>{
    const {username} = req.body
    if (!username){
        return res.send(`<h1>Please Enter a Valid Username</h1>`)
    }
    users.push(username)
    console.log(users)
    res.status(200).send(`<h1>Welcome to our Website ${username}</h1>`)
})

app.listen(5000, ()=> {
    console.log("Server Listening on the port")
})