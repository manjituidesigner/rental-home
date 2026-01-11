const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= VERIFY TOKEN =================
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token header से निकालना
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User find
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // request में user attach
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

// ================= ROLE CHECK =================
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this resource",
      });
    }
    next();
  };
};
