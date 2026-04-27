const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ env से API key लो
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("User:", message);

    // ✅ model inside route (safe)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    // ✅ await सिर्फ function के अंदर
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log("AI:", text);

    res.json({
      reply: text,
    });

  } catch (error) {
    console.log("Gemini Error:", error);

    res.json({
      reply: "⚠️ AI error aa gaya",
    });
  }
});

module.exports = router;