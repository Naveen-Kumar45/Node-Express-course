require('dotenv').config()
const Product = require('./models/products.js')
const connectDB = require('./db/connect.js')
const productsjson = require("./products.json")
const { application } = require('express')

async function storeData(){
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        console.log("old Data Deleted")
        await Product.create(productsjson)
        console.log("New Data Inserted")
        process.exit(0)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

storeData()