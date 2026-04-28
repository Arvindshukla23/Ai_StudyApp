const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// 📦 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ===============================
// ✅ UPDATE PROFILE
// ===============================
router.post(
  "/update-profile",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      console.log("USER ID:", userId);

      const updateData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

      // ✅ profile image save
      if (req.file) {
        updateData.profilePic = `/uploads/${req.file.filename}`;
      }

      console.log("UPDATE DATA:", updateData);

      // ✅ DB UPDATE
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );

      // 🔥 IMPORTANT FIX: proper response format
      res.json({
        message: "Profile Updated ✅",
        user: updatedUser,
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Profile update failed ❌" });
    }
  }
);

module.exports = router;