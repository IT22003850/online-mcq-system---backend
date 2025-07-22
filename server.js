const express = require("express");
const colors = require("colors");
const connectDB = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");

connectDB();

const app = express();

// Other middleware
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);

app.listen(5000, () => {
  console.log(`Server is listning to port: 5000`.blue);
});
