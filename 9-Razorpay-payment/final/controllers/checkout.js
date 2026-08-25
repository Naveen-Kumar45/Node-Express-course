require("dotenv")
const createError = require("http-errors")
const statusCodes = require("http-status-codes")
const crypto = require("crypto")

//initialize Razor pay
const RazorPay = require("razorpay")

const razorpay = new RazorPay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})

//middlewares
const Product = require("../models/products")
const Order = require("../models/orders")
const { stat } = require("fs/promises")

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
    let orderItems = [];

    for (const item of items) {
        const product = products.find((product) => product._id.toString() === item.productId);
        
        if (!product) {
            return res.status(404).json({ message: `Product not found: ${item.productId}` });
        }

        orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: Number(item.quantity) || 1
        });

        const quantity = Number(item.quantity) || 1;
        totalAmount += product.price * quantity;
        }

    const order = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });

    console.log("Razorpay order created:", order);

    const newOrder = await Order.create({
        items: orderItems,
        totalAmount: totalAmount,
        currency: "INR",
        status: "pending",
        razorpayOrderId: order.id,
    });

    console.log("MongoDB order created :", newOrder)

    res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_API_KEY,
    });
};

const verifyPayment = async (req,res) => {
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        }=req.body

        const order = await Order.findOne({
            razorpayOrderId : razorpay_order_id
        })

        if (!order){
            return res.status(statusCodes.BAD_REQUEST).json({
                success : false,
                msg : "Order Not Found, Invalid Order ID"
            })
        }

        console.log("Razorpay Signature :", razorpay_signature)

        const generatedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(order.razorpayOrderId + "|" + razorpay_payment_id).digest("hex")

        console.log("Generated Signature :", generatedSignature)

        if (generatedSignature !== razorpay_signature){
            return res.status(statusCodes.BAD_REQUEST).json({
                success : false,
                msg : "Payment verification failed , Invalid signature"
            })
        }

        console.log("Payment signature Verified")

        const payment = await razorpay.payments.fetch(razorpay_payment_id)

        if (payment.status != "captured"){

            order.status = "failed"

            return res.status(statusCodes.NOT_ACCEPTABLE).json({
                success : false,
                msg : "Payment not captured , Order Failed"
            })
        }

        order.status = "paid"
        order.razorpayPaymentId = razorpay_payment_id
        order.razorpaySignature = razorpay_signature

        await order.save();

        return res.status(statusCodes.OK).json({
            success: true,
            msg: "Payment is captured and Order placed successfully"
        });

    }
    catch(err){

        console.log("Error occured :", err)

        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Payment Verification Failed"
        })
    }

}


module.exports = {createRazorpayCheckout, verifyPayment}