const express = require("express")
const router = express.Router()

const {loginMethod, registerMethod} = require("../controllers/auth")
const {emailConfirmation} = require("../controllers/verify")
const verification = require("../middlewares/verification")

router.route('/login').post(loginMethod)
router.route('/register').post(registerMethod)
router.route('/register/verifyemail').post(verification,emailConfirmation)
//router.route('/login/forgotpassword').post(forgotPasswordMethod)

module.exports = router
