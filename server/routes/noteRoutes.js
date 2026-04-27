const express = require("express");
const router = express.Router();

const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const Note = require("../models/Note");

// 📦 MULTER CONFIG
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
// 📌 UPLOAD NOTE (FINAL FIXED)
// ===============================
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const { title, subject, description, tags } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded ❌",
        });
      }

      const newNote = new Note({
        userId: req.user.id,
        title,
        subject,
        description,
        tags: tags ? tags.split(",") : [],
        fileUrl: req.file.path,
        fileType: req.file.mimetype,
      });

      await newNote.save();

      return res.json({
        success: true,
        message: "Note uploaded successfully 🚀",
        note: newNote,
      });

    } catch (err) {
      console.log("🔥 UPLOAD ERROR FULL:", err);
      return res.status(500).json({ message: err.message });
    }
  }
);

// ===============================
// 📌 GET USER NOTES
// ===============================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

module.exports = router;