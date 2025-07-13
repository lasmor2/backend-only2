# Backend Only

This project focuses solely on the backend logic of a web application. It includes API development, database integration, authentication, and other server-side functionalities. Ideal for projects where the frontend is handled separately or by another team.

## 🚀 Features

- **Secure Password Hashing** using `bcryptjs`
- **HTTP Request Logging** with `morgan` for easier debugging and monitoring
- **Environment Variable Management** with `dotenv` for secure config handling
- **Robust Input Validation** using `joi` to ensure request data integrity
- **JWT-based Authentication** with `jsonwebtoken` for stateless user sessions
- **Cross-Origin Resource Sharing (CORS)** enabled with `cors` for API access control
- **Security Middleware** using `helmet` to set secure HTTP headers
- **Cookie Parsing** with `cookie-parser` for session and auth token management
- **Email Sending Capabilities** via `nodemailer` (e.g., for user verification or password reset)
- **MongoDB Integration** using `mongoose` for data modeling and database access
- **Live Development Reloading** with `nodemon` for a smoother dev workflow
- **Express.js Framework** for routing and middleware-based backend logic

## 📦 Installation

1. **Clone the repository:**

git clone https://github.com/lasmor2/backend-only2.git

cd your-repo-name

2. **Install dependencies:**
   npm install

3. **Create a .env file**

   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   HMAC_VERIFICATION_KEY=your_hmac_key

4. **Start the development server:**

   npm run dev
   
   The app uses nodemon for automatic reloading during development.
