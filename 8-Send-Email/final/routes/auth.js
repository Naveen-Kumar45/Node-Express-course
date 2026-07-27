const express = require("express")
const router = express.Router()

const {loginMethod, registerMethod} = require("../controllers/auth")
const {emailConfirmation} = require("../controllers/verify-email")
const verification = require("../middlewares/email-verification")
const resetPasswordmiddleware = require("../middlewares/reset-password")
const {forgotPassword, changePassword} = require("../controllers/change-password")

router.route('/login').post(loginMethod)
router.route('/register').post(registerMethod)
router.route('/register/verifyemail').post(verification,emailConfirmation)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').post(resetPasswordmiddleware,changePassword)

module.exports = router
