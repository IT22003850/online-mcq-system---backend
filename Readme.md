# Online MCQ System - Backend

## Overview

The backend for the Online MCQ System is a Node.js/Express application that provides APIs for managing exams, questions, user authentication, and results. It uses MongoDB (MongoDB Atlas or local) for data storage and supports user registration, login, exam submission, and result history retrieval.

## Features

- **User Authentication**: Register and login users with JWT-based authentication.
- **Exams and Questions**: Manage multiple-choice exams and questions.
- **Result Tracking**: Store and retrieve user exam results and answers.
- **Protected Routes**: Secure API endpoints with JWT middleware.
- **Database Seeding**: Seed the database with sample exams, questions, and users.

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- dotenv
- colors

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm

## Setup Instructions

1. **Clone the Repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd online-mcq-system --backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Required dependencies (in `package.json`):
   ```json
   {
     "dependencies": {
       "express": "^4.17.1",
       "mongoose": "^7.0.0",
       "dotenv": "^17.2.0",
       "colors": "^1.4.0",
       "express-async-handler": "^1.2.0",
       "jsonwebtoken": "^9.0.0"
     },
     "devDependencies": {
       "nodemon": "^3.1.10"
     }
   }
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the project root:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@ac-be1hqnf-shard-00-01.wcjz58d.mongodb.net/online-mcq-system?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret_here
     PORT=5000
     ```
   - For local MongoDB, use `MONGO_URI=mongodb://localhost:27017/online-mcq-system` and start MongoDB:
     ```bash
     mongod
     ```

4. **Seed the Database**:
   - Run the seed script to populate the database with 3 exams, 15 questions, and 1 user:
     ```bash
     node seed.js
     ```
   - Expected output: `Database seeded successfully`.

5. **Start the Server**:
   ```bash
   npm start
   ```
   - The server runs on `http://localhost:5000` with `nodemon` for auto-restart.

## API Endpoints

- **POST /api/users/register**: Register a new user (body: `{ "name": "string", "email": "string" }`).
- **POST /api/users/login**: Login user and get JWT (body: `{ "name": "string", "email": "string" }`).
- **GET /api/exams**: Get all exams (protected).
- **GET /api/exams/:examId/questions**: Get questions for an exam (protected).
- **POST /api/exams/:examId/submit**: Submit exam answers (protected, body: `{ "answers": [{ "question_id": "string", "selected_option": number }]`).
- **GET /api/results/:userId**: Get user’s result history (protected).

## Directory Structure

```
online-mcq-system --backend/
├── config/
│   └── dbConfig.js
├── controllers/
│   └── examController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── examModel.js
│   ├── questionModel.js
│   ├── userModel.js
│   ├── resultModel.js
│   └── answerModel.js
├── routes/
│   ├── examRoutes.js
│   └── userRoutes.js
├── .env
├── server.js
├── seed.js
└── package.json
```

## Testing

- Use Postman to test APIs:
  - Login to get a JWT token: `POST http://localhost:5000/api/users/login`.
  - Use token in `Authorization: Bearer <token>` for protected routes.
- Verify database:
  ```bash
  mongo
  use online-mcq-system
  db.users.find()
  db.exams.find()
  db.questions.find()
  db.results.find()
  ```

## Troubleshooting

- **MongoDB Connection Error**: Ensure `MONGO_URI` is correct in `.env` and MongoDB is running.
- **401 Unauthorized**: Verify JWT token in request headers and user exists in database.
- **500 Internal Server Error**: Check server logs for details (e.g., missing models or invalid data).
- Contact: `serendilabs@gmail.com` for support.