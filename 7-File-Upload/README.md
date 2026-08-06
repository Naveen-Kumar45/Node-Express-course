# 7-File-Upload

A small Node + Express example project that demonstrates file upload handling (both local and Cloudinary), validation (file type / size), serving a simple frontend, and storing image metadata in MongoDB. This folder contains a complete "final" implementation and a minimal "starter" scaffold.

## Table of Contents
- Project overview
- Features
- Prerequisites
- Installation
- Environment variables
- Run (development & production)
- API & Frontend
- Project structure (explained)
- Common tasks & examples
- Troubleshooting
- Contributing
- License

## Project overview
This example shows how to accept file uploads from a browser, validate uploaded files (size and extension), optionally upload to Cloudinary, save image metadata in MongoDB, and serve a small frontend that lets you pick and upload files.

The repository includes:
- final/ — complete example with controllers, routes, middlewares, Cloudinary config, DB connect and frontend files.
- starter/ — minimal starting point (contains `app.js` placeholder).

## Features
- Multipart file upload handling
- File size and extension validation middleware
- Option to upload to Cloudinary (cloudinary configuration included)
- Store image metadata (and file URL) in MongoDB
- Simple static frontend (index.html) to demo uploads
- Centralized error handling and not-found middleware

## Prerequisites
- Node.js (14+ recommended)
- npm (or yarn)
- MongoDB (local or Atlas) if you want to persist metadata
- Cloudinary account (optional) if you want remote image hosting

## Installation
1. Clone the repository and change into the 7-File-Upload/final folder:
   - git clone <repo>
   - cd 7-File-Upload/final

2. Install dependencies:
   - npm install

(If you prefer yarn: yarn install)

## Environment variables
Create a `.env` file in the `final/` directory (or set env variables in your environment). Typical variables used by this project:

- PORT — Port to run the server (e.g., 5000)
- MONGO_URI — MongoDB connection string (if using MongoDB)
- CLOUDINARY_CLOUD_NAME — Cloudinary cloud name (if using Cloudinary)
- CLOUDINARY_API_KEY — Cloudinary API key
- CLOUDINARY_API_SECRET — Cloudinary API secret

Note: The project includes a `.gitignore` file to avoid committing uploads and env files.

## Run

Development (with nodemon if available)
- npm run dev
Production
- npm start

(If package.json uses different scripts, run the relevant start/dev scripts in your package.json.)

## API & Frontend

Frontend:
- `public/index.html` — Simple page that provides a file input and upload button.
- `public/script.js` — Client-side JavaScript to submit a file via fetch/XHR.
- `public/style.css` — Basic styling.

Static files are served from `public/` so pointing your browser at the server root will show the demo upload page.

Typical API endpoints (implementation lives in `final/routes/files.js` and controller logic in `final/controllers/files.js`):
- POST /api/files/upload (example) — Upload a file (multipart/form-data). The exact route name may vary; check `routes/files.js` for configured paths.
- GET /api/files/:id — Return metadata or URL for a stored image (if implemented).
- Other helper endpoints may be present; inspect `routes/files.js` for exact route paths.

Example curl for file upload (adjust URL and route to match actual route):
curl -X POST http://localhost:5000/api/files/upload -F "image=@/path/to/file.jpg"

Headers: Content-Type: multipart/form-data is set automatically by curl when using -F.

## Project structure (important files)
- final/
  - app.js — Main Express server application (entrypoint).
  - package.json / package-lock.json — Dependencies and scripts.
  - cloudinary/
    - configure.js — Cloudinary client configuration and helper functions for uploading.
  - controllers/
    - files.js — Core upload logic, interactions with Cloudinary/local storage and DB.
  - db/
    - connect.js — MongoDB connection helper.
  - middlewares/
    - file-size-ext.js — Middleware to validate file extensions and file size.
    - error-handler.js — Central error handler for API responses.
    - not-found.js — 404 handler.
  - models/
    - product-image-schema.js — Mongoose schema (or model) for persisted image metadata.
  - public/
    - index.html — Small frontend to test uploads.
    - script.js — Frontend JS to submit upload requests and handle responses.
    - style.css — Demo page styling.
  - routes/
    - files.js — Route definitions that map HTTP endpoints to controller functions.
  - uploads/ — Local directory for storing uploaded files (gitignored).
  - .gitignore — ensures `uploads/` and other local artifacts are ignored.

- starter/
  - app.js — Starting point / blank server file to begin implementing the same behavior.

## Common tasks & examples

Upload from browser
- Open the server (http://localhost:PORT) to load `public/index.html`, pick a file and upload using the demo form.

Upload via curl
- curl -X POST http://localhost:5000/api/files/upload -F "image=@/path/to/image.jpg"

If using Cloudinary:
- Ensure CLOUDINARY_* env vars are set.
- The `cloudinary/configure.js` helper will handle the upload and return a hosted URL that the controller can save in MongoDB.

Storing metadata
- After successful upload, controllers typically create a DB record (model: `product-image-schema.js`) containing:
  - original filename
  - stored filename / URL
  - size
  - upload timestamp
  - (optionally) Cloudinary public_id

Serve static uploads (local)
- If files are stored in `uploads/`, Express will often be configured to serve them statically. Check `app.js` for `express.static` setup.

## Troubleshooting

- "No file uploaded" — Ensure the form field name matches what the server expects (e.g., `image`), and that you are sending multipart/form-data.
- Cloudinary auth errors — Verify CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, and CLOUDINARY_CLOUD_NAME.
- MongoDB connection errors — Confirm MONGO_URI is correct and reachable.
- File size/type rejections — The middleware `file-size-ext.js` enforces allowed extensions and max size. Adjust as required.

## Contributing
This folder is part of a tutorial-style repository. Contributions can:
- Improve validation and error messages
- Add unit tests for controllers/middleware
- Add more thorough documentation and examples
- Improve the frontend UX for previewing uploads before sending

If you submit changes, follow the repo's contribution guidelines and ensure sensitive values are not committed.

## License
Use the repository's license or add one if missing. For tutorial code, MIT is commonly used.

---

If you want, I can:
- produce the README as a real file in the repository (I can draft a commit),
- extract exact endpoint paths and sample requests by reading the route/controller files and then update the README with line-accurate examples.