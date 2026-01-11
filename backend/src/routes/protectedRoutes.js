const express = require("express");
const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Any logged-in user
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to dashboard",
    user: req.user,
  });
});

// Only tenant
router.get(
  "/tenant",
  protect,
  authorizeRoles("tenant"),
  (req, res) => {
    res.json({
      success: true,
      message: "Tenant dashboard access granted",
    });
  }
);

// Only owner
router.get(
  "/owner",
  protect,
  authorizeRoles("owner"),
  (req, res) => {
    res.json({
      success: true,
      message: "Owner dashboard access granted",
    });
  }
);

// Only broker
router.get(
  "/broker",
  protect,
  authorizeRoles("broker"),
  (req, res) => {
    res.json({
      success: true,
      message: "Broker dashboard access granted",
    });
  }
);

module.exports = router;
