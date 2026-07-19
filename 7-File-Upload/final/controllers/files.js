const uploadFile = require('express-fileupload') // uploadFile is a middleware that allows us to handle file uploads in Express.js applications. It simplifies the process of receiving files from clients and makes them accessible through the `req.files` object. It is commonly used in scenarios where users need to upload files, such as images, documents, or other media, to the server. By using this middleware, developers can easily manage file uploads without having to manually parse multipart/form-data requests.
const path = require('path')

const createError = require('http-errors') // createError is a utility function from the 'http-errors' package that allows us to create HTTP error objects with specific status codes and messages. It simplifies error handling in Express.js applications by providing a consistent way to generate errors that can be passed to the error-handling middleware. This helps in maintaining clean and readable code when dealing with various error scenarios, such as validation failures, unauthorized access, or resource not found errors.
const StatusCodes = require('http-status-codes') // StatusCodes is an object provided by the 'http-status-codes' package that contains a collection of standard HTTP status codes and their corresponding numeric values. It allows developers to use descriptive names for status codes (e.g., StatusCodes.BAD_REQUEST) instead of hardcoding numeric values (e.g., 400). This improves code readability and maintainability, making it easier to understand the purpose of each status code in the context of HTTP responses.

const multer = require('multer') // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It allows you to easily handle file uploads in Node.js applications by providing a simple API to process incoming files and store them on the server or in memory. Multer can be configured to specify storage options, file size limits, and file type filters, making it a versatile tool for managing file uploads in web applications.
const upload = multer() // upload is an instance of the multer middleware that is configured to handle file uploads. In this case, it is set up with default settings, which means it will store uploaded files in memory (RAM) rather than saving them to disk. This is useful for scenarios where you want to process the files immediately without persisting them on the server. The `upload` instance can be used as middleware in Express routes to handle file uploads, allowing you to access the uploaded files through the `req.files` object in your route handlers.


const fileUpload = (req,res) => {

    if (!req.files || req.files.length === 0){
        throw createError(StatusCodes.BAD_REQUEST,"No file uploaded")  
    }

    console.log(req.files)

    res.status(StatusCodes.CREATED).json({
        msg: "File uploaded successfully!"
    });
}

module.exports = {fileUpload}