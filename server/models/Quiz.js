const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    questions: {
      type: Number,
      default: 0,
    },
    attempted: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    topics: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);