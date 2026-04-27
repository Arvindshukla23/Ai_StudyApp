const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Quiz = require("../models/Quiz");

// 📊 QUIZ STATS (DYNAMIC)
router.get("/quiz/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const quizzes = await Quiz.find({ userId });

    const totalQuestions = quizzes.reduce((acc, q) => acc + q.questions, 0);
    const attempted = quizzes.reduce((acc, q) => acc + q.attempted, 0);

    const avgScore =
      quizzes.length > 0
        ? quizzes.reduce((acc, q) => acc + q.score, 0) / quizzes.length
        : 0;

    const topics = [...new Set(quizzes.flatMap(q => q.topics))];

    res.json({
      totalQuestions,
      attempted,
      time: quizzes.length * 10,
      passPercent: 70,
      topics,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;