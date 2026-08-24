const express = require("express")
const router = express.Router()

const {createRazorpayCheckout, verifyPayment} = require("../controllers/checkout.js")

router.route('/checkout').post(createRazorpayCheckout)
router.route("/verify").post(verifyPayment)

module.exports = router