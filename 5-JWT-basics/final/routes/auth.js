const express = require("express")
const router = express.Router()


const {signIn, userDetails} = require("../controllers/auth.js")

router.route("/login").post(signIn)
router.route("/dashboard").get(userDetails)

module.exports = router