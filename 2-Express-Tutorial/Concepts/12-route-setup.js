const express = require('express')
const app = new express()

const authRoute = require("../routes/auth.js")
const peopleRoute = require("../routes/people.js")
const personsRoute =require("../routes/persons.js")
//static assets
app.use(express.static("../methods-public"))
//parse the json data and make the body readable
app.use(express.json())
//parse the Form data
app.use(express.urlencoded({extended : false}))

app.use('/api/people',peopleRoute)

app.use("/api/persons",personsRoute)

app.use('/login',authRoute)


app.listen(5000, ()=> {
    console.log("Server Listening on the port")
})
