const express = require('express');
const router = express.Router();
const { getAllContests, getContestById, addContest, getAllContestsApi } = require('../controllers/contestController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getLeetcodeContests}= require('../controllers/contestController');
// Public Routes
router.get('/allcontest',getAllContestsApi)
router.get('/leetcode-contests', getLeetcodeContests);
router.get('/', getAllContests);              // Fetch all contests, with optional filters
router.get('/:id', getContestById);           // Fetch a specific contest by ID
// Admin-Only Routes
router.post('/add', protect, isAdmin, addContest);  // Add a new contest (only admin can add)

module.exports = router;
