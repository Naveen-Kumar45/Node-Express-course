const express = require("express")
const app = express()

const {products,people} = require("./data.js")

app.get("/api/data", (req,res) => {
    //res.set('Content-Type',"application/json")
    res.json({products,people})
})

app.use((req,res) => {
    res.status(404).send("<h1>Page Not Found</h1>")
})

const port=5000
app.listen(port,() => {
    console.log(`Server is running on the port ${port} `)

})