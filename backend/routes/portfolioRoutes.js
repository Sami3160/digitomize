const express = require('express');
const router = express.Router();
const { getUserPortfolio, updatePortfolio,gfgdata } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Protected Routes (logged-in users only)
router.get('/', protect, getUserPortfolio);         // Fetch the user's portfolio
router.put('/update', protect, updatePortfolio);    // Update the user's portfolio
// router.post('/gfgdata', gfgdata);           // Fetch data from GeeksforGeeks API
module.exports = router;
