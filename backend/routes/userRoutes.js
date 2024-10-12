const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);  // Register a new user
router.post('/login', loginUser);        // Login user and get JWT token

// Protected Routes (only for logged-in users)
router.get('/profile', protect, getUserProfile);  // Get logged-in user's profile

module.exports = router;
