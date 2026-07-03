require('dotenv').config()

const express = require("express")
const app = new express()

//custom middlewares
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const authentication = require("./middlewares/authenticate.js")
const connectDB = require("./db/connect")
const jobsRoute = require("./routes/jobs.js")
const authRoute = require("./routes/auth.js")

//built-in-middlewares
app.use(express.json())
app.use(express.static("./public"))

//routes
app.get("/",(req,res) => {
    res.status(200).send(`<a href="/api/v1/auth/register" > Jobs Documentation </a>`)
})


app.use("/api/v1/jobs",authentication,jobsRoute)
app.use("/api/v1/auth",authRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB")
        app.listen(PORT,()=>{
            console.log(`Server running on the port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()
