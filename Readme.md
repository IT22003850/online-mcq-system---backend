# Online MCQ System - Backend

## Overview
The backend of the Online MCQ System is a Node.js application built with Express.js and MongoDB. It provides APIs for user authentication, exam management, question retrieval, answer submission, and result tracking. The application uses JWT for authentication and Mongoose for MongoDB interactions.

## Features
- User registration and login with JWT authentication
- Exam management (listing exams, fetching questions)
- Answer submission and score calculation
- Result history tracking
- Protected routes using middleware
- Data seeding for initial setup

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/IT22003850/online-mcq-system---backend.git
   cd online-mcq-system-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. Seed the database with initial data:
   ```bash
   node seed.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   Or start the production server:
   ```bash
   npm start
   ```

## Project Structure
```
online-mcq-system-backend/
├── config/
│   └── dbConfig.js          # MongoDB connection setup
├── controllers/
│   ├── examController.js    # Exam-related API logic
│   ├── resultsController.js # Result-related API logic
│   ├── userController.js    # User authentication logic
├── middlewares/
│   └── authMiddleware.js    # JWT authentication middleware
├── models/
│   ├── answerModel.js       # Answer schema
│   ├── examModel.js         # Exam schema
│   ├── questionModel.js     # Question schema
│   ├── resultModel.js       # Result schema
│   ├── userModel.js         # User schema
├── routes/
│   ├── examRoutes.js        # Exam API routes
│   ├── resultsRoute.js      # Result API routes
│   ├── userRoutes.js        # User API routes
├── seed.js                  # Database seeding script
├── server.js                # Main server file
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables (not committed)
```

## API Endpoints
### User Routes
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user and return JWT
- `GET /api/users/me` - Get current user details (protected)

### Exam Routes
- `GET /api/exams` - Fetch all exams (protected)
- `GET /api/exams/:examId/questions` - Fetch questions for an exam (protected)
- `POST /api/exams/:examId/submit` - Submit answers for an exam (protected)

### Result Routes
- `GET /api/results/:userId` - Fetch user's result history (protected)

## Dependencies
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling
- `jsonwebtoken`: JWT authentication
- `express-async-handler`: Async error handling for Express
- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Environment variable management
- `colors`: Console output styling
- `nodemon`: Development server auto-restart (dev dependency)

## Scripts
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `node seed.js`: Seed database with initial data

## Deployment
The backend is deployed on Railway at `https://online-mcq-system-backend-production.up.railway.app`. Ensure the `.env` file is properly configured with the production MongoDB URI and JWT secret.

## Notes
- Ensure MongoDB is running before starting the server.
- The seed script clears existing data before adding new exams, questions, and users.
- All protected routes require a valid JWT in the `Authorization` header as `Bearer <token>`.