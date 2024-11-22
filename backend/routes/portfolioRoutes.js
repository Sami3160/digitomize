const express = require('express');
const router = express.Router();
const { getUserPortfolio,getAndUpdateUserStats, updatePortfolio,getLinkedAccounts, updateLinkedAccounts } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Protected Routes (logged-in users only)
router.get('/', protect, getUserPortfolio);         
router.get('/linkedaccounts',getLinkedAccounts)
router.post('/updatelinkedaccounts',  updateLinkedAccounts);
router.put('/update', protect, updatePortfolio);
// horsh bjoi add protect middleware later, for postman testing use test these routes without middleware    
router.put('/getupdateportfolio', getAndUpdateUserStats);
router.put('/forceUpdateStats', getAndUpdateUserStats);
// router.post('/gfgdata', gfgdata);           // Fetch data from GeeksforGeeks API
module.exports = router;
