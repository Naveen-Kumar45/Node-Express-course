# File Upload Example — 7-File-Upload (final)

This small Express app demonstrates handling multipart file uploads in Node.js and integrating: local upload options, Cloudinary streaming uploads, and MongoDB-stored metadata.

Contents
- app.js — application entry point (middleware, static folders, route mounting, DB connect and server start)
- controllers/files.js — upload controller (streams files to Cloudinary and saves metadata to MongoDB)
- routes/files.js — routes definition (POST /api/v1/upload)
- db/connect.js — mongoose connect helper
- middlewares/file-size-ext.js — multer configuration (memory storage, limits and file-type validation)
- middlewares/error-handler.js — centralized error handler
- cloudinary/configure.js — Cloudinary configuration (reads env variables)
- models/product-image-schema.js — Mongoose schema for product images
- public/ — static assets
- uploads/ — local uploads directory (served at /uploads)
- .gitignore — ignores node_modules and .env

Quick start
1. Clone the repository and open the folder for this exercise:
   cd 7-File-Upload/final

2. Install dependencies:
   npm install

3. Create a `.env` file in the project root with the required environment variables (see below).

4. Start the server:
   npm start
   The server will use `PORT` from env or default to 5000.

Required environment variables
Create a `.env` file (do not commit it). The app expects at least:
- MONGO_URI — MongoDB connection string
- CLOUD_NAME — Cloudinary cloud name
- API_KEY — Cloudinary API key
- API_SECRET — Cloudinary API secret
- PORT — optional, port to run the server on

Note: cloudinary/configure.js reads CLOUD_NAME / API_KEY / API_SECRET. Make sure you provide those variable names or update the file to match your .env keys.

API
Base path: /api/v1

Upload endpoint
- POST /api/v1/upload
- Form field name: product (the route uses upload.array('product', 3))
- Allows up to 3 images per request, maximum file size 5MB per file
- Allowed file types: JPG, JPEG, PNG (validated via extension and mimetype)

Successful response (201 Created)
{
  "msg": "File uploaded successfully!",
  "name": "<stored-name>",
  "images": ["<secure_url_1>", "<secure_url_2>"]
}

Errors
- 400 Bad Request — No file uploaded
- 413 / REQUEST_TOO_LONG — File size too large (LIMIT_FILE_SIZE)
- 413 / REQUEST_TOO_LONG — File limit exceeded (LIMIT_FILE_COUNT)
- 415 / UNSUPPORTED_MEDIA_TYPE — Only JPG, JPEG and PNG files are allowed
- 500 Internal Server Error — Generic server error

Example curl (replace values)

curl -X POST http://localhost:5000/api/v1/upload \
  -F "product=@/path/to/image1.jpg" \
  -F "product=@/path/to/image2.png"

How it works (high level)
- multer is configured with memoryStorage so uploaded files are available as buffers on `req.files`.
- For each uploaded file the controller uses `streamifier.createReadStream(buffer).pipe(cloudinary.uploader.upload_stream(...))` to stream the file to Cloudinary without writing to disk.
- The controller collects the resulting secure URLs and creates a single MongoDB document in the `productImages` collection with the `name` and `image` (array of secure_urls).
- Static folders: `./public` is served as public assets and `/uploads` is mounted to serve any locally stored files.
- Centralized error handler maps multer errors and other errors to friendly JSON responses.

Notes and recommendations
- Keep `.env` secret and do not commit it. `.gitignore` contains `.env` already.
- Validate file content if you expect more formats (e.g., inspect magic numbers) and not rely solely on extension/mimetype.
- Consider rate-limiting and authentication for upload endpoints in production.
- If you prefer local storage instead of Cloudinary, switch multer storage to `diskStorage` and update the controller accordingly.

Where to look in the code
- routes/files.js — defines POST /api/v1/upload and the multer middleware usage
- middlewares/file-size-ext.js — storage, limits and fileFilter rules
- controllers/files.js — cloudinaryUploader helper and fileUpload handler
- cloudinary/configure.js — cloudinary initialization and env usage
- models/product-image-schema.js — mongoose schema

License
No license specified in this folder. Add one if you plan to publish the code.
