const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUser, updateProfile, getSafeUserData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const FileUpload = require('../config/multer-config');


router.post('/register', registerUser);  
router.post('/login', loginUser);
router.post('/updateUser', protect , updateUser)  
router.post('/updateProfile',protect, FileUpload, updateProfile);
router.get('/profile', protect, getUserProfile); 
router.get('/getUser', getSafeUserData)
module.exports = router;
