const createError = require('http-errors') // createError is a utility function from the 'http-errors' package that allows us to create HTTP error objects with specific status codes and messages. It simplifies error handling in Express.js applications by providing a consistent way to generate errors that can be passed to the error-handling middleware. This helps in maintaining clean and readable code when dealing with various error scenarios, such as validation failures, unauthorized access, or resource not found errors.
const StatusCodes = require('http-status-codes') // StatusCodes is an object provided by the 'http-status-codes' package that contains a collection of standard HTTP status codes and their corresponding numeric values. It allows developers to use descriptive names for status codes (e.g., StatusCodes.BAD_REQUEST) instead of hardcoding numeric values (e.g., 400). This improves code readability and maintainability, making it easier to understand the purpose of each status code in the context of HTTP responses.

const productImages = require('../models/product-image-schema.js') // productImages is a Mongoose model that represents the structure and behavior of the "product-images" collection in the MongoDB database. It defines the schema for storing information about uploaded product images, including fields such as the image filename, file path, and any associated metadata. By using this model, developers can easily interact with the database to create, read, update, and delete product image records, enabling efficient management of uploaded files within the application.

const cloudinary = require('../cloudinary/configure.js') // cloudinary is a configured instance of the Cloudinary library, which provides a cloud-based service for managing images and videos. It allows developers to upload, store, transform, and deliver media files efficiently. By using the Cloudinary instance, developers can easily integrate image and video management capabilities into their applications, enabling features such as image resizing, format conversion, and optimization for web delivery. The configuration typically includes authentication credentials and settings specific to the Cloudinary account being used.
const streamifier = require('streamifier') // streamifier is a Node.js library that allows you to convert various data types, such as buffers or strings, into readable streams. This is particularly useful when working with file uploads, as it enables you to process uploaded files in a streaming manner without having to save them to disk first. By using streamifier, developers can efficiently handle file uploads and perform operations like uploading to cloud storage services (e.g., Cloudinary) or processing the file data in real-time.


const cloudinaryUploader = (buffer) => {
    return new Promise((resolve,reject) => { // This line creates a new Promise that wraps the Cloudinary upload process. It allows the function to handle asynchronous operations, such as uploading files to Cloudinary, and provides a way to resolve or reject the promise based on the success or failure of the upload. By returning a promise, the function can be used with async/await syntax, making it easier to manage asynchronous code and handle errors in a more readable manner.
        const stream = cloudinary.uploader.upload_stream({ // This line creates a writable stream using the Cloudinary uploader's upload_stream method. It allows you to upload files to Cloudinary in a streaming manner, which is useful for handling large files or when you want to process the file data on-the-fly. The method takes an options object and a callback function as parameters. The options object can include various settings, such as the folder where the uploaded files should be stored, transformations to apply to the images, and other upload-related configurations. The callback function is called once the upload is complete or if an error occurs during the upload process.
            folder : "product-images"
        },
        (error,result) => {
            if (result){
                resolve(result)
            } else {
                reject(error)
            }
        })
        streamifier.createReadStream(buffer).pipe(stream) // This line uses the streamifier library to create a readable stream from the provided buffer (which contains the file data). The createReadStream method converts the buffer into a stream, allowing it to be processed in a streaming manner. The resulting readable stream is then piped into the Cloudinary upload stream created earlier. This effectively sends the file data to Cloudinary for uploading, enabling efficient handling of file uploads without having to save the files to disk first. By using streams, developers can manage memory usage more effectively and handle large files without running into performance issues.
    })
}


const fileUpload = async (req,res) => {

    if (!req.files || req.files.length === 0){
        throw createError(StatusCodes.BAD_REQUEST,"No file uploaded")  
    }

    // Below code is used to upload images to mongoDB atlas as single documents even when we select multiple images and it is achieved through diskStorage.
    /*const store = await productImages.create({
        image : req.files.map((file) => file.path),
        name : req.files.map((file) => file.originalname)
    })
    console.log(store) */

    // below code is used to upload files to Cloudinary, a cloud-based image and video management service. It iterates through each uploaded file in the request, creates a new document in the "product-images" collection for each file, and stores the file path and original name in the database. This allows for easy retrieval and management of uploaded files within the application while leveraging Cloudinary's capabilities for image optimization, transformation, and delivery.
    let images = []
    let names = []
    let name = ""
    for (const file of req.files){

        console.log("The actual file is :",file)
        const result = await cloudinaryUploader(file.buffer) // This line calls the cloudinaryUploader function, passing the file buffer as an argument. The cloudinaryUploader function is responsible for uploading the file to Cloudinary using a streaming approach. It returns a promise that resolves with the result of the upload operation, which includes information such as the secure URL of the uploaded image. By awaiting this function, the code ensures that each file is uploaded to Cloudinary before proceeding to the next step, allowing for efficient handling of multiple file uploads in a sequential manner.
        
        console.log("The result is: ", result)

        images.push(result.secure_url)
        //names.push(file.originalname)
        name = file.originalname

    }

    const store = await productImages.create({
        name : name, //names
        image : images
    }) // This line creates new documents in the "product-images" collection of the MongoDB database using the Mongoose model productImages. It takes the images array, which contains objects with the secure URL of the uploaded image and its original name, and inserts them into the database. The create method returns a promise that resolves with the newly created documents, allowing for easy retrieval and management of uploaded files within the application.
    console.log("The stored images are: ", store)


    res.status(StatusCodes.CREATED).json({
        msg: "File uploaded successfully!",
        name : store.name, //names
        images : store.image // This line sends a JSON response back to the client with a status code of 201 (Created). The response includes a message indicating that the file upload was successful and an array of the stored image documents from the database. This allows the client to receive confirmation of the successful upload and access information about the uploaded files, such as their secure URLs and original names, for further processing or display in the application.
    });
}

module.exports = {fileUpload}