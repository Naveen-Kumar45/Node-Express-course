const express = require("express")
const router = express.Router()

const {createRazorpayCheckout} = require("../controllers/checkout.js")

router.route('/checkout').post(createRazorpayCheckout)

module.exports = router