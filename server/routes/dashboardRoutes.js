const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Note = require("../models/Note");

// 📊 REAL STATS
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await Note.countDocuments({ userId });

    const lastWeek = await Note.countDocuments({
      userId,
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      notes,
      quizzes: 0,
      studyHours: notes * 2, // dummy logic (later improve)
      avgScore: 0,
      weeklyGrowth: lastWeek,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;