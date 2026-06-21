const express = require('express')
const app = new express()

const connectDB=require("./db/connect.js")
const tasks = require("./routes/tasks.js")
require("dotenv").config()
//app.use(express.static("./public"))
app.use(express.json())


app.use("/api/v1/tasks",tasks)

const connect = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB...")
        app.listen(5000, () => {
            console.log("Server listening on the port")
        }) 
    }
    catch(err){
        console.log(err)
    }
}

connect()

