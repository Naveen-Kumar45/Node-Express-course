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

const createRazorpayCheckout = async (req, res) => {
    const items = Array.isArray(req.body.items) ? req.body.items : [];

    if (!items.length) {
        return res.status(400).json({ message: "No items provided in cart" });
    }

    const productIDs = items.map((item) => item.productId);

    const products = await Product.find(
        { _id: { $in: productIDs } 
    });

    let totalAmount = 0;

    for (const item of items) {
        const product = products.find((product) => product._id.toString() === item.productId);
        
        if (!product) {
            return res.status(404).json({ message: `Product not found: ${item.productId}` });
        }

        const quantity = Number(item.quantity) || 1;
            totalAmount += product.price * quantity;
        } 

    const order = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_API_KEY,
    });
};


module.exports = {createRazorpayCheckout}