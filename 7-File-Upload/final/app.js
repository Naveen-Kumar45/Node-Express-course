const fileUpload = require("express-fileupload")
const path = require("path")

const express = require("express")
const app = express()

//middlewares
app.use(express.static("./public"))
app.use(express.json())

const fileroute = require("./routes/files.js")

const PORT = process.env.PORT || 5000;

app.use("/api/v1",fileroute)

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})
