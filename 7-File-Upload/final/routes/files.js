const express = require("express")
const router = express.Router()

const multer = require("multer")
const upload = multer()

const {fileUpload} = require("../controllers/files.js")

router.route("/upload").post(upload.array('file'),fileUpload)

module.exports=router