const express = require("express")
const router = express.Router()

const {loginMethod, registerMethod} = require("../controllers/auth")

router.route('/login').post(loginMethod)
router.route('/register').post(registerMethod)
//router.route('/login/forgotpassword').post(forgotPasswordMethod)

module.exports = router