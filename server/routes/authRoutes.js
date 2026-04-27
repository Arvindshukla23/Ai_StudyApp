const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ❌",
      });
    }

    name = name.trim();
    email = email.trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Signup successful ✅",
    });

  } catch (error) {
    console.log("🔥 SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ SAFE CHECK (IMPORTANT FIX)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required ❌",
      });
    }

    email = email.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found ❌",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials ❌",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful ✅",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("🔥 LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ================= PROTECTED ROUTE =================
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      message: "Welcome 🎉",
      user,
    });

  } catch (error) {
    console.log("🔥 DASHBOARD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;