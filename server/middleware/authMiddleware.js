const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔍 Debug (optional - remove later)
    console.log("AUTH HEADER:", authHeader);

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided ❌",
      });
    }

    // ❌ Wrong format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid token format ❌",
      });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing ❌",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user
    req.user = decoded;

    next();

  } catch (err) {
    console.log("🔥 TOKEN ERROR:", err.message);

    return res.status(401).json({
      message: "Unauthorized ❌",
    });
  }
};

module.exports = authMiddleware;