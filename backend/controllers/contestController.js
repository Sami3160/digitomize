const Contest = require('../models/Contest');

exports.getAllContests = async (req, res) => {
    const { platform, difficulty } = req.query;
    try {
        const filter = {};
        if (platform) filter.platform = platform;
        if (difficulty) filter.difficulty = difficulty;

        const contests = await Contest.find(filter);
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addContest = async (req, res) => {
    const { name, platform, date, difficulty, link } = req.body;
    try {
        const newContest = new Contest({
            name,
            platform,
            date,
            difficulty,
            link,
        });

        const savedContest = await newContest.save();
        res.status(201).json(savedContest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContestById = async (req, res) => {
    const contestId = req.params.id;
    try {
        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ message: "Contest not found" });
        }
        res.status(200).json(contest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
