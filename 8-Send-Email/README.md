# 8-Send-Email Module

A complete authentication system with email verification and password reset functionality using Node.js, Express, and MongoDB.

## 📋 Overview

This module implements a secure authentication system that includes:
- User registration with email OTP verification
- User login with email verification checks
- Password reset functionality with secure tokens
- Welcome emails for new verified users
- Multiple email services (Nodemailer for development, SendGrid integration)

## 🏗️ Project Structure

```
8-Send-Email/
├── final/
│   ├── app.js                          # Main Express application
│   ├── package.json                    # Dependencies
│   │
│   ├── controllers/
│   │   ├── auth.js                     # Authentication logic
│   │   ├── change-password.js          # Password change handler
│   │   └── verify-email.js             # Email verification handler
│   │
│   ├── services/
│   │   ├── verify-email-otp.js         # OTP generation & verification email
│   │   ├── welcome-email.js            # Welcome email after verification
│   │   └── forgot-password-email.js    # Password reset email
│   │
│   ├── routes/
│   │   └── auth.js                     # Auth API routes
│   │
│   ├── models/
│   │   ├── user-schema.js              # User database model
│   │   └── otp-schema.js               # OTP storage model
│   │
│   ├── middlewares/
│   │   ├── not-found.js                # 404 handler
│   │   └── error-handler.js            # Global error handler
│   │
│   ├── db/
│   │   └── connect.js                  # MongoDB connection
│   │
│   └── public/                         # Static assets
```

## 🔑 Key Features

### 1. **User Registration & Verification**
- Users register with name, email, and password
- OTP (One-Time Password) generated and sent via email
- OTP expires after 5 minutes for security
- User cannot login until email is verified

```javascript
// Registration endpoint generates OTP verification
const verificationToken = await verifyEmail(newUser.email, newUser._id)
```

### 2. **Email Services**

#### **verify-email-otp.js**
- Generates random 6-digit OTP using crypto
- Stores OTP in database with 5-minute expiration
- Sends verification email with formatted HTML template
- Creates JWT token for frontend tracking

#### **welcome-email.js**
- Sends professional welcome email after verification
- Contains branded HTML template with instructions
- Provides next steps for the user

#### **forgot-password-email.js**
- Generates secure reset token (JWT)
- Creates reset link with token as query parameter
- Link expires in 10 minutes
- Professional HTML email with reset button

### 3. **Security Features**

**From app.js:**
- **Helmet**: Sets secure HTTP headers
- **CORS**: Controls cross-origin requests
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **XSS Sanitizer**: Prevents malicious script injection
- **DNS Configuration**: Uses Google's public DNS (8.8.8.8, 8.8.4.4)
- **JWT Authentication**: Secure token-based auth

## 📦 Dependencies

```json
{
  "@sendgrid/mail": "^8.1.6",      // SendGrid email service
  "bcryptjs": "^3.0.3",             // Password hashing
  "cors": "^2.8.6",                 // CORS middleware
  "dotenv": "^17.4.2",              // Environment variables
  "express": "^5.2.1",              // Web framework
  "express-rate-limit": "^8.6.0",   // Rate limiting
  "express-xss-sanitizer": "^2.0.2",// XSS protection
  "helmet": "^8.3.0",               // Security headers
  "jsonwebtoken": "^9.0.3",         // JWT tokens
  "mongoose": "^9.8.0",             // MongoDB ODM
  "nodemailer": "^9.0.3"            // Email service
}
```

## 🔧 Environment Variables

Create a `.env` file in the `8-Send-Email/final/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/auth-hub
EMAIL_ID=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup for Nodemailer:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password from Google Account Security
3. Use the App Password in `EMAIL_PASS`

## 🚀 Getting Started

```bash
# Navigate to the project directory
cd 8-Send-Email/final

# Install dependencies
npm install

# Start the development server
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/register` | Register new user & send OTP |
| POST | `/login` | Login user (requires verified email) |
| GET | `/dashboard` | Get authenticated user info |
| POST | `/verify-email` | Verify email with OTP |
| POST | `/change-password` | Change password |
| POST | `/forgot-password` | Send password reset email |

## 🛠️ How Email Flow Works

### Registration Flow:
```
User Registration → OTP Generated → Email Sent → User Receives OTP → 
Verification Code Submitted → Email Verified → Access Granted
```

### Password Reset Flow:
```
Forgot Password Request → Reset Token Generated → Reset Email Sent → 
User Clicks Link → New Password Set → Email Confirmed
```

## ⚠️ Production Email Alternatives to Nodemailer

While **Nodemailer** is excellent for development and small projects, it has limitations in production:

### Issues with Nodemailer in Production:
- ❌ Gmail blocks less secure apps (requires App Passwords)
- ❌ Limited deliverability on shared hosting
- ❌ No built-in bounce/complaint handling
- ❌ Poor tracking and analytics
- ❌ Difficult to implement retry logic
- ❌ Lower email delivery rates

---

## 🌟 Recommended Production Email Services

### **1. SendGrid (Recommended)**

**Pros:**
- Industry-leading email deliverability (99.5%+)
- Built-in bounce and complaint handling
- Excellent analytics and tracking
- Template support with dynamic content
- Free tier: 100 emails/day
- Paid: $9.95/month for 50,000 emails

**Implementation:**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'user@example.com',
  from: 'noreply@example.com',
  subject: 'Verify Your Email',
  html: `<p>Your OTP: ${otp}</p>`,
};

await sgMail.send(msg);
```

**Install:**
```bash
npm install @sendgrid/mail
```

---

### **2. AWS SES (Simple Email Service)**

**Pros:**
- Most affordable at scale
- Deep AWS integration
- 62,000 emails/month free tier
- Pay-as-you-go pricing ($0.10 per 1,000 emails)
- Advanced compliance features

**Implementation:**
```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

const params = {
  Source: 'noreply@example.com',
  Destination: { ToAddresses: ['user@example.com'] },
  Message: {
    Subject: { Data: 'Verify Your Email' },
    Body: { Html: { Data: `<p>Your OTP: ${otp}</p>` } }
  }
};

await ses.sendEmail(params).promise();
```

**Install:**
```bash
npm install aws-sdk
```

---

### **3. Mailgun**

**Pros:**
- Developer-friendly API
- Email validation API included
- Powerful webhooks for tracking
- 10,000 emails/month free
- Pay-as-you-go after that

**Implementation:**
```javascript
const mailgun = require('mailgun.js');
const FormData = require('form-data');

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

await mg.messages.create(process.env.MAILGUN_DOMAIN, {
  from: 'noreply@example.com',
  to: 'user@example.com',
  subject: 'Verify Your Email',
  html: `<p>Your OTP: ${otp}</p>`,
});
```

**Install:**
```bash
npm install mailgun.js form-data
```

---

### **4. Twilio SendGrid (Alternative Setup)**

**Pros:**
- Fully managed email service
- Email authentication (SPF, DKIM, DMARC)
- A/B testing support
- Compliance with CAN-SPAM

**Why Choose Over Basic Nodemailer:**
- Uses SendGrid's infrastructure
- Better deliverability rates
- Webhook support for delivery tracking
- Detailed reporting and analytics

---

### **5. Postmark**

**Pros:**
- Lightning-fast delivery (average 10ms)
- Excellent support
- Built-in templates
- Free tier: 100 emails/month
- Very reliable for transactional emails

**Implementation:**
```javascript
const postmark = require('postmark');
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

await client.sendEmail({
  From: 'noreply@example.com',
  To: 'user@example.com',
  Subject: 'Verify Your Email',
  HtmlBody: `<p>Your OTP: ${otp}</p>`,
});
```

**Install:**
```bash
npm install postmark
```

---

## 📊 Comparison Table

| Feature | Nodemailer | SendGrid | AWS SES | Mailgun | Postmark |
|---------|-----------|----------|---------|---------|----------|
| Free Tier | ✅ (Gmail) | ✅ (100/day) | ✅ (62K/month) | ✅ (10K/month) | ✅ (100/month) |
| Deliverability | ⚠️ Medium | ✅ Excellent | ✅ Excellent | ✅ Great | ✅ Excellent |
| Tracking | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Templates | ❌ No | ✅ Yes | ⚠️ Limited | ✅ Yes | ✅ Yes |
| Webhooks | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Support | ⚠️ Community | ✅ 24/7 | ✅ 24/7 | ✅ 24/7 | ✅ Excellent |
| Setup Complexity | ✅ Easy | ✅ Easy | ⚠️ Medium | ✅ Easy | ✅ Easy |

---

## 🔒 Security Best Practices

1. **Store sensitive data in .env:**
   ```env
   EMAIL_ID=your-email
   EMAIL_PASS=app-specific-password
   SENDGRID_API_KEY=your-key
   ```

2. **Use environment-specific configurations:**
   ```javascript
   const emailService = process.env.NODE_ENV === 'production' 
     ? sgMail 
     : nodemailer;
   ```

3. **Implement rate limiting on email endpoints:**
   ```javascript
   app.use(rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   }));
   ```

4. **Always validate email addresses:**
   ```javascript
   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   ```

5. **Use HTTPS in production**

6. **Keep OTP tokens short-lived (5-10 minutes)**

---

## 🧪 Testing Email Services

### Test SendGrid Locally:
```bash
npm install --save-dev nodemailer-sendgrid
```

### Mock Email in Development:
```javascript
if (process.env.NODE_ENV === 'development') {
  // Use Mailhog or similar for local testing
  const testTransport = nodemailer.createTransport({
    host: 'localhost',
    port: 1025
  });
}
```

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [Mailgun Documentation](https://documentation.mailgun.com/)
- [Postmark Documentation](https://postmarkapp.com/developers)

---

## 🐛 Troubleshooting

**Email not sending:**
- Verify `.env` variables are correct
- Check Gmail App Password (not regular password)
- Ensure 2FA is enabled on Gmail
- Check firewall/ISP blocking port 587

**OTP expiring too quickly:**
- Adjust expiration time in `verify-email-otp.js` line 32
- Default: 5 minutes, adjust as needed

**High bounce rate:**
- Migrate to SendGrid or AWS SES
- Implement email validation
- Use double opt-in confirmation

---

## 📝 License

ISC

---

## 👨‍💻 Author

Course Module - Node & Express Authentication with Email
