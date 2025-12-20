const express = require("express");
const router = express.Router();
const { signup, login, getUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");

// ------------------------
// Public Routes
// ------------------------

// Signup route
// POST http://localhost:5000/api/users/signup
router.post("/signup", signup);

// Login route
// POST http://localhost:5000/api/users/login
router.post("/login", login);

// ------------------------
// Protected Routes
// ------------------------

// Get all users (admin only / token required)
// GET http://localhost:5000/api/users
router.get("/", auth, getUsers);

module.exports = router;


