const express = require("express")
const router = express.Router()

const {loginMethod, registerMethod, dashboard} = require("../controllers/auth")
const {emailConfirmation, resendVerification} = require("../controllers/verify-email")
const verification = require("../middlewares/email-verification")
const resetPasswordmiddleware = require("../middlewares/reset-password")
const {forgotPassword, changePassword} = require("../controllers/change-password")
const authentication = require("../middlewares/authenticate")

router.route('/login').post(loginMethod)
router.route('/register').post(registerMethod)
router.route('/register/verifyemail').post(verification,emailConfirmation)
router.route('/resendverification').post(resendVerification)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').post(resetPasswordmiddleware,changePassword)
router.route("/dashboard").get(authentication, dashboard)

module.exports = router
