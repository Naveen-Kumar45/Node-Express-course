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

    const products = await Product.find({
        _id : { $in : productIDs}
    })

    //console.log(products)
    total_amount=0
    
    for (let item of req.body.items){

        const product = products.find(product => product._id.toString() === item.productId)

        total_amount+=product.price * item.quantity
    }

    const order = await razorpay.orders.create({
        amount : total_amount,
        currency : "INR",
        receipt : `receipt_${Date.now()}`
    })

    console.log(order)

    res.status(200).json({
        order
    })
}


module.exports = {createRazorpayCheckout}