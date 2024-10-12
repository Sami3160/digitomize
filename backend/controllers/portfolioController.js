const Portfolio = require('../models/Portfolilo');

// Fetch User Portfolio
exports.getUserPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Portfolio (e.g., achievements, coding history)
exports.updatePortfolio = async (req, res) => {
    const { achievements, codingHistory } = req.body;
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        portfolio.achievements = achievements || portfolio.achievements;
        portfolio.codingHistory = codingHistory || portfolio.codingHistory;
        await portfolio.save();

        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};