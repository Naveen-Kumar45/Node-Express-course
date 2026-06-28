const express = require('express')
const app = new express()

const connectDB=require("./db/connect.js")
const tasks = require("./routes/tasks.js")
const notFound = require("./middlewares/not-found.js")
const errorHandler = require("./middlewares/error-handling.js")
require("dotenv").config()

//middlewares
app.use(express.static("./public"))
app.use(express.json())

//routes
app.use("/api/v1/tasks",tasks)

app.use(notFound)

app.use(errorHandler);

//app.get("/api/v1/tasks",getTasks)          --Read the tasks
//app.get("/api/v1/tasks/:id",getTask)       --Read the specific task
//app.post("/api/v1/tasks",createTask)       --Create the task
//app.patch("/api/v1/tasks/:id",updateTask)  --Update the task
//app.delete("/api/v1/tasks/:id",deleteTask) --Delete the task

const port = process.env.PORT || 3000  // to assign port through the terminal "$env:PORT=6000; node app.js"

//connection to mongoDB atlas using .env file
const connect = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB...")
        app.listen(port, () => {
            console.log(`Server listening on the port ${port}`)
        }) 
    }
    catch(err){
        console.log(err)
    }
}

connect()

