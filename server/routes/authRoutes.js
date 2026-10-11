const express = require("express");
const protect = require("../middleware");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, (req, res) => {
  res.status(200).json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
});

module.exports = router;
