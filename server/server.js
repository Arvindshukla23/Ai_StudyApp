require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();

console.log("ENV KEY:", process.env.GEMINI_API_KEY);

// middleware
app.use(express.json());
app.use(cors());

// ✅ पहले import करो
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
const quizRoutes = require("./routes/quizRoutes");

// ✅ फिर console log करो
console.log("AUTH ROUTES:", authRoutes);
console.log("CHAT ROUTES:", chatRoutes);
console.log("AUTH MIDDLEWARE:", require("./middleware/authMiddleware"));

// ✅ फिर use करो
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/quiz", quizRoutes);


// create uploads folder static access
app.use("/uploads", express.static("uploads"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});