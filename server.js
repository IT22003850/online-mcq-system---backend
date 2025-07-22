const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const resultsRoutes = require("./routes/resultsRoute");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Other middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://<your-netlify-app>.netlify.app"],
    credentials: true,
  })
);

//Routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listning to port: ${PORT}`.blue);
});
