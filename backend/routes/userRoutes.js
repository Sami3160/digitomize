const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUser, updateProfile, getSafeUserData,linkAccounts,unlinkAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const FileUpload = require('../config/multer-config');


router.post('/register', registerUser);  
router.post('/login', loginUser);
router.post('/updateUser', protect , updateUser)  
router.post('/updateProfile',protect, FileUpload, updateProfile);
router.get('/profile', protect, getUserProfile); 
router.get('/getUser', getSafeUserData);
router.post('/linkAccounts',linkAccounts);
router.delete('/unlinkAccount', unlinkAccount);
module.exports = router;
