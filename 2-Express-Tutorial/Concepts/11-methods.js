const express = require('express')
const app = new express()
const {products, people} = require('./data.js')

let users=[]
let persons=["Rohit","Rahul","Saaho","Mitchell","Uday"]

//static assets
app.use(express.static("./methods-public"))
//parse the json data and make the body readable
app.use(express.json())
//parse the Form data
app.use(express.urlencoded({extended : false}))

app.get('/api/people',(req,res)=>{
    req.data=people
    console.log(req.data)
    //console.log(req)
    res.send(
        {success : true,
        data : people
    })
})

app.get("/api/persons",(req,res)=>{
    req.data = persons
    res.status(201).send({
        success : true,
        data : persons
    })
    //console.log(req.data)
    //console.log(req)
})

app.post('/login',(req,res)=>{
    const {username} = req.body
    if (!username){
        return res.send(`<h1>Please Enter a Valid Username</h1>`)
    }
    users.push(username)
    console.log(users)
    res.status(201).send(`<h1>Welcome to our Website ${username}</h1>`)
})

app.post("/api/persons",(req,res) => {
    const newPerson = req.body
    console.log(newPerson)

    if (!newPerson.name){
        return res.status(400).send({
            success : false,
            msg : "Please enter a valid Username"
        })
    }
    persons.push(newPerson.name)
    console.log(persons)
    res.status(201).json({
        success : true,
        person : newPerson
    })
})

app.post('/api/postman/persons',(req,res)=>{
    const {name} = req.body
    if (!name){
        return res.status(400).send({
            success : false,
            msg : "Please enter a valid Username"
        })
    }
    persons.push(name)
    res.status(201).send({
        success : true,
        data : [persons]
    })

})

app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body

    const person = people.find(function(person){
        return person.id === Number(id)
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the ID ${id}`
        })
    }

    const newPeople = people.map((person)=>{
        if (person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({
        success : true,
        people : newPeople
    })
})

app.delete("/api/people/:id",(req,res)=>{
    const {id} = req.params

    const person = people.find(function(person){
        return person.id === Number(id)
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the ID ${id}`
        })
    }

    const newPeople = people.filter((person)=>{
        return person.id !== Number(id)
    })
    res.status(200).json({
        success : true,
        people : newPeople
    })

})

app.listen(5000, ()=> {
    console.log("Server Listening on the port")
})