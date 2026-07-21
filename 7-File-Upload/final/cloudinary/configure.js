require('dotenv').config()

const cloudinary = require("cloudinary").v2 // This line imports the Cloudinary library and accesses its version 2 API. Cloudinary is a cloud-based service that provides image and video management, including uploading, storing, transforming, and delivering media files. By using the Cloudinary library, developers can easily integrate these capabilities into their applications, allowing them to handle media files efficiently and leverage Cloudinary's features for optimization and delivery.

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME, // This line sets the cloud name for the Cloudinary configuration. The cloud name is a unique identifier for your Cloudinary account and is used to associate your media files with your account. By retrieving the cloud name from an environment variable (process.env.CLOUD_NAME), you can keep sensitive information out of your source code and easily manage different configurations for development, testing, and production environments.
    api_key : process.env.API_KEY, // This line sets the API key for the Cloudinary configuration. The API key is a unique identifier that allows your application to authenticate with the Cloudinary service and access its features. By retrieving the API key from an environment variable (process.env.API_KEY), you can keep sensitive information out of your source code and easily manage different configurations for development, testing, and production environments.
    api_secret : process.env.API_SECRET // This line sets the API secret for the Cloudinary configuration. The API secret
})

module.exports = cloudinary // This line exports the configured Cloudinary instance, making it available for use in other parts of the application. By exporting the instance, you can easily import and use it in different modules or files, allowing you to perform operations such as uploading, transforming, and managing media files with Cloudinary throughout your application.