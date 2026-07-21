# JWT Basics - Node.js & Express Authentication

A complete authentication system built with **Node.js**, **Express**, and **JSON Web Tokens (JWT)** that demonstrates user registration, login, and protected route access.

## 📋 Overview

This project implements a full-stack JWT authentication system with a MongoDB database backend and an HTML/CSS/JavaScript frontend. It covers the fundamental concepts of JWT-based authentication including token generation, verification, and dashboard access control.

## 🚀 Features

- **User Registration** - Create new user accounts with validation
- **User Login** - Authenticate users and generate JWT tokens
- **Protected Routes** - Dashboard access only with valid JWT tokens
- **JWT Token Generation** - Secure tokens with 1-hour expiration
- **Error Handling** - Comprehensive error management with custom error middleware
- **Responsive UI** - Clean, user-friendly interface for registration, login, and dashboard
- **MongoDB Integration** - Persistent user data storage
- **Input Validation** - Email validation and password requirements

## 📁 Project Structure

```
5-JWT-basics/
├── final/                          # Complete implementation
│   ├── controllers/
│   │   └── auth.js                # Authentication logic (register, login, dashboard)
│   ├── models/
│   │   └── user-schema.js         # MongoDB user schema with validation
│   ├── routes/
│   │   └── auth.js                # API routes for auth endpoints
│   ├── middlewares/
│   │   ├── authenticate.js        # JWT token verification middleware
│   │   ├── error-handler.js       # Global error handling middleware
│   │   └── notFound.js            # 404 route handler
│   ├── db/
│   │   └── connect.js             # MongoDB connection utility
│   ├── public/                    # Frontend files
│   │   ├── index.html             # Landing/login page
│   │   ├── register.html          # User registration page
│   │   ├── dashboard.html         # Protected dashboard page
│   │   ├── script.js              # Frontend JavaScript logic
│   │   └── style.css              # Styling
│   ├── app.js                     # Express app setup and configuration
│   ├── package.json               # Project dependencies
│   └── .gitignore                 # Git ignore rules
└── starter/                       # Starter template for learning
```

## 🛠 Technologies Used

### Backend
- **Express.js** - Web framework for Node.js
- **MongoDB & Mongoose** - NoSQL database and ODM
- **jsonwebtoken (JWT)** - Token creation and verification
- **http-errors** - HTTP error utilities
- **http-status-codes** - Standard HTTP status codes
- **dotenv** - Environment variable management
- **validator** - Data validation library

### Frontend
- **HTML5** - Page structure
- **CSS3** - Styling and responsive design
- **JavaScript (Vanilla)** - Client-side logic
- **Local Storage** - Token persistence

### Development
- **Nodemon** - Auto-restart server during development

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveen-Kumar45/Node-Express-course.git
   cd Node-Express-course/5-JWT-basics/final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   touch .env
   ```

4. **Add environment variables**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/jwt-basics
   JWT_SECRET_KEY=your_secret_key_here
   ```
   
   > ⚠️ **Important**: Never use simple keys in production! Use a long, complex, and unguessable string.

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/v1/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Response (201 Created)**
```json
{
  "msg": "Registration complete. Redirecting you to your dashboard",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/v1/login
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**
```json
{
  "msg": "Success! Redirecting you to your Dashboard",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Dashboard (Protected)
```http
GET /api/v1/dashboard
Authorization: Bearer <your_token_here>
```

**Response (202 Accepted)**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "iat": 1704067200,
  "exp": 1704070800
}
```

## 🔐 Authentication Flow

1. **Registration/Login**: User submits credentials via HTML form
2. **Token Generation**: Server validates credentials and generates JWT
3. **Token Storage**: Frontend stores token in localStorage
4. **Protected Access**: JWT included in Authorization header for dashboard access
5. **Token Verification**: Authenticate middleware verifies JWT before allowing access
6. **Dashboard Display**: User data extracted from JWT and displayed

## 📝 User Schema

```javascript
{
  name: String (required, 8-30 chars),
  email: String (required, valid email, unique),
  password: String (required, min 8 chars),
  role: String (required)
}
```

**Validation Rules:**
- Name: 8-30 characters minimum
- Email: Valid email format, unique in database
- Password: Minimum 8 characters
- Role: Required field (e.g., "user", "admin")

## 🛡️ Middleware

### Authenticate Middleware
- Verifies JWT tokens from Authorization header
- Validates token signature and expiration
- Attaches decoded user data to request object
- Throws 401 Unauthorized error if token is invalid

### Error Handler Middleware
- Catches all errors throughout the application
- Handles validation errors from Mongoose
- Manages duplicate key errors (unique constraint violations)
- Returns formatted error responses

### Not Found Middleware
- Handles 404 errors for undefined routes
- Returns user-friendly error page

## 🎯 Key Concepts Demonstrated

- **JWT Structure**: Header.Payload.Signature
- **Token Expiration**: Tokens expire after 1 hour
- **Bearer Token**: Authorization header format
- **Payload Claims**: User data included in token (name, email, role)
- **Synchronous Verification**: Token verification on protected routes
- **Error Handling**: Centralized error handling with custom middleware

## ⚠️ Security Notes

⚠️ **This is a learning project. For production:**

1. **Password Security**
   - Hash passwords using bcrypt
   - Current implementation stores plain text (not safe!)

2. **JWT Secret**
   - Use a long, complex, cryptographically secure string
   - Store in environment variables
   - Never commit to version control

3. **HTTPS**
   - Always use HTTPS in production
   - Tokens can be intercepted over HTTP

4. **Token Refresh**
   - Implement refresh tokens for extended sessions
   - Current implementation uses fixed 1-hour expiration

5. **CORS**
   - Configure CORS appropriately for production
   - Restrict allowed origins

## 🧪 Testing the Application

1. **Register a new user**: Navigate to `/register.html` and create an account
2. **Login**: Go to `/index.html` and login with your credentials
3. **Access Dashboard**: After login, you'll be redirected to the dashboard
4. **Verify Protection**: Try accessing dashboard without a valid token

## 📖 Learning Resources

This project covers:
- Express middleware concepts
- JWT authentication flow
- MongoDB/Mongoose data modeling
- Error handling patterns
- Frontend-backend communication
- HTTP request/response handling
- Client-side token management

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📄 License

ISC License

## 👤 Author

[Naveen Kumar](https://github.com/Naveen-Kumar45)

---

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

**Happy Learning! 🚀**
