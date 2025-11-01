const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Check if token format is correct (Bearer <token>)
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token format is invalid" });
  }

  // Extract token
  const tokenValue = token.split(" ")[1];

  // Verify token
  try {
    // Make sure JWT_SECRET is set in your .env file
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not found in .env file. Please add it.");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    
    req.user = decoded; // because token payload is { id, role }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

