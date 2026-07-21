const StatusCodes = require("http-status-codes")
const createError = require("http-errors")

const path = require("path")
const multer = require("multer")

// The Below code is used to configure multer for handling file uploads in an Express.js application. It sets up the storage destination and filename format for uploaded files, specifies allowed file types and extensions, and defines limits on the number of files and their sizes. The configuration ensures that only valid image files (JPEG and PNG) are accepted, and it provides error handling for unsupported file types. This setup allows developers to easily manage file uploads while enforcing constraints on the uploaded content.
/*const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename  : (req,file,cb) => {
        cb(null, Date.now()+"-"+file.originalname)
    }},
)*/

const storage = multer.memoryStorage(); // MemoryStorage is a storage engine provided by the multer middleware for handling file uploads in Node.js applications. It stores uploaded files in memory (RAM) instead of saving them to disk. This is useful for scenarios where you want to process the files immediately without persisting them on the server. However, it may not be suitable for large files or high-traffic applications, as it can consume significant memory resources.

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
