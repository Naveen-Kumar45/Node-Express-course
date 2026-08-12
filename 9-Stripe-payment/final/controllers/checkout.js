require("dotenv")
const createError = require("http-errors")
const statusCodes = require("http-status-codes")

//initialize Razor pay
const RazorPay = require("razorpay")

const razorpay = new RazorPay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})

//middlewares
const Product = require("../models/products")
const Order = require("../models/orders")

const createRazorpayCheckout = async (req,res) => {
    const productIDs = req.body.items.map(item => item.productId)

    const products = Product.find({
        _id : { $in : productIDs}
    })
}


module.exports = {createRazorpayCheckout}