const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Test create user (temporary)
router.post("/create-test-user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
