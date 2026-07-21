const express = require("express")
const router = express.Router()

const StatusCodes = require("http-status-codes")
const createError = require("http-errors")

const upload = require("../middlewares/file-size-ext.js")
const {fileUpload} = require("../controllers/files.js")

router.route("/upload").post(upload.array('product',3),fileUpload)

module.exports=router