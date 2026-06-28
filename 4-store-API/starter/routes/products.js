const express = require("express")
const router = express.Router()

//controllers
const {getProducts, getStaticProducts} = require("../controllers/products.js")

router.route("/").get(getProducts)
router.route("/static").get(getStaticProducts)

module.exports=router