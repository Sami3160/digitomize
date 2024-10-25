const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUser, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const FileUpload = require('../config/multer-config');
// Public Routes
router.post('/register', registerUser);  // Register a new user
router.post('/login', loginUser);
router.post('/updateUser', protect , updateUser)    // Login user and get JWT token
router.post('/updateProfile',protect, FileUpload, updateProfile);
// Protected Routes (only for logged-in users)
router.get('/profile', protect, getUserProfile);  // Get logged-in user's profile

module.exports = router;
