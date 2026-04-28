require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const noteRoutes = require("./routes/noteRoutes");
const quizRoutes = require("./routes/quizRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

// ✅ DEBUG LOG
console.log("✅ All routes loaded");

// ✅ ROUTES USE (IMPORTANT ORDER CLEANED)
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes); // 🔥 THIS IS YOUR MAIN ROUTE

// ✅ STATIC FOLDER (FOR PROFILE IMAGE)
app.use("/uploads", express.static("uploads"));

// ✅ DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// ✅ TEST ROUTE (DEBUG)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});