const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,

  // 🔥 NEW FIELDS
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "Student",
  },
});

module.exports = mongoose.model("User", userSchema);