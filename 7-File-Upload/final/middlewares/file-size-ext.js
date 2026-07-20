const StatusCodes = require("http-status-codes")
const createError = require("http-errors")

const path = require("path")
const multer = require("multer")


const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename  : (req,file,cb) => {
        cb(null, Date.now()+"-"+file.originalname)
    }},
)

const allowedTypes = ["image/jpeg","image/png"]
const extensions = [".jpg", ".jpeg", ".png"]

const upload = multer({
    storage,
    limits:{
        files: 3,
        fileSize : 5 * 1024 * 1024,
    },
    fileFilter : (req,file,cb) => {
        //console.log(req.files)
        const ext = path.extname(file.originalname).toLowerCase()

        if (extensions.includes(ext) && allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(createError(StatusCodes.UNSUPPORTED_MEDIA_TYPE,"Only JPG, JPEG and PNG files are allowed"))
        }
    }
})

module.exports = upload
