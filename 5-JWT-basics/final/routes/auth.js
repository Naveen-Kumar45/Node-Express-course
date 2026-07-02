const express = require("express")
const router = express.Router()

const authenticate = require("../middlewares/authenticate.js")
const {signIn, dashboard} = require("../controllers/auth.js")

router.route("/login").post(signIn)
router.route("/dashboard").get(authenticate,dashboard)

module.exports = router