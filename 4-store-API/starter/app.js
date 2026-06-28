const express = require("express")
const app =new express()
require("dotenv").config()

//middlewares
const connectDB = require("./db/connect.js")
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler.js")

//routes
const products = require("./routes/products.js")

const Port = process.env.PORT || 5000

app.get("/",(req,res )=>{
    res.status(200).send(`<a href="/api/v1/products">Go to Products</a>`)
})

app.use("/api/v1/products",products)


app.use(notFound)
app.use(errorHandler)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to the DB.....")
        app.listen(Port, () => {
            console.log(`Server Listening  on the port ${Port} `)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()