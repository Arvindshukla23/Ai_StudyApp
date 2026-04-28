const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require("../middleware/authMiddleware");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message required ❌",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "API key missing ❌",
      });
    }

    console.log("User:", message);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log("AI:", text);

    res.status(200).json({
      reply: text,
    });

  } catch (error) {
    console.log("🔥 Gemini Error:", error);

    res.status(500).json({
      reply: "⚠️ AI error aa gaya",
    });
  }
});

module.exports = router;