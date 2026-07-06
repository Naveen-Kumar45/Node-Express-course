require('dotenv').config()

const express = require("express")
const app = new express()

//extra security packages
const helmet = require("helmet")
const cors = require("cors")
const { xss } = require("express-xss-sanitizer")
const rateLimit = require("express-rate-limit")

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


//custom middlewares
const authentication = require("./middlewares/authenticate.js")
const connectDB = require("./db/connect.js")

//error handler middleware
const notFound = require("./middlewares/not-found.js")
const errorHandler = require("./middlewares/error-handler.js")

//routers
const jobsRoute = require("./routes/jobs.js")
const authRoute = require("./routes/auth.js")

app.set('trust proxy',1);
app.use(rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max : 100, //limit each IP to 100 requests per windowMs
}))
app.use(express.json());
//app.use(express.static("./public"));
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/",(req,res) => {
    res.status(200).send(`
  <div style="
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  ">
    <h1>Jobs API</h1>
    <a href="/api-docs">Documentation</a>
  </div>`)
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

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
