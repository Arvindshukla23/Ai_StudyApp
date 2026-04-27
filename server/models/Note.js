const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: String,
    subject: String,
    description: String,
    tags: [String],
    fileUrl: String,
    fileType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);