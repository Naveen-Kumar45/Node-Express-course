const uploadFile = require('express-fileupload')
const multer = require('multer')
const path = require('path')

const upload = multer()
const fileUpload = (req,res) => {
    console.log(req.files)
    res.send({
        message: "File uploaded successfully!"
    });
}

module.exports = {fileUpload}