const StatusCodes = require("http-status-codes")
const createError = require("http-errors")

const path = require("path")
const multer = require("multer")

const allowedTypes = ["image/jpeg","image/png"]
const extensions = [".jpg", ".jpeg", ".png"]

const upload = multer({
    limits:{
        fileSize : 5 * 1024 * 1024,
        files: 3
    },
    fileFilter : (req,file,cb) => {
        console.log(req.files)
        const ext = path.extname(file.originalname).toLowerCase()

        if (extensions.includes(ext) && allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(createError(StatusCodes.NOT_ACCEPTABLE,"Only JPG, JPEG and PNG files are allowed"))
        }
    }
})

module.exports = upload
