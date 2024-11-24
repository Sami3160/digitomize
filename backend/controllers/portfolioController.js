const Portfolilo = require('../models/Portfolilo');
const Portfolio = require('../models/Portfolilo');
const User = require('../models/User');
const axios = require('axios')
const crypto = require('crypto');
const mongoose = require('mongoose')
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

// exports.gfgdata = async (req, res) => {
//     try {
//         const response = await axios.post('https://geeks-for-geeks-api.vercel.app/atharvpatil73');
//         res.json(response.data); // Send the response back to the frontend
//     } catch (error) {
//         res.status(500).send('Error fetching data from GeeksforGeeks API');
//     }
// };


exports.getLinkedAccounts = async (req, res) => {
    try {

        const _id = req.query._id;
        console.log(_id)
        const { lcUsername, cfUsername, gfgUsername, githubUsername, ccUsername, hrUsername ,cnUsername } = await User.findById(_id).lean()
        console.log({ lcUsername, cfUsername, gfgUsername, githubUsername, ccUsername, hrUsername,cnUsername })
        res.status(200).json({ lcUsername, cfUsername, gfgUsername, githubUsername, ccUsername, hrUsername,cnUsername })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}
exports.updateLinkedAccounts = async (req, res) => {
    try {
        const platformName = req.query.platform;
        const _id = req.query._id;

        const updatedPlatform = await User.findByIdAndUpdate(
            _id,
            { platform:platformName },
            { new: true, useFindAndModify: false }
        ).lean();
        res.status(200).json(updatedPlatform)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

exports.getAndUpdateUserStats = async (req, res) => {
    try {
        const _id = req.query._id;
        let portfolioData = await Portfolilo.findById(_id)
        // console.log(portfolioData)

        const currTime = new Date()
        let newStats = {}
        if (portfolioData) {
            const oldTime = portfolioData.lastUpdated;
            if ((currTime - oldTime) / 1000 / 60 > 15) {
                const { lcUsername, cfUsername, gfgUsername } = await User.findById(_id).lean();
                if (lcUsername) {
                    try {


                        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}`);
                        const lcresponse2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/badges`);
                        const lcresponse3 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/solved`);
                        const response4 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/contest`);
                        const lcprofileData = response.data;
                        const badgesData = lcresponse2.data;
                        const solvedProblemsData = lcresponse3.data;
                        const contestData = response4.data;

                        // Process the data and update newStats
                        newStats.lcStats = {
                            profileData: lcprofileData,
                            badges: badgesData,
                            solvedProblems: solvedProblemsData,
                            contest: contestData
                        };
                    } catch (error) {
                        console.log("error in leetcode stats fetch", error)
                    }
                }

                //codeforces
                if (cfUsername) {
                    try {


                        const [cfresponse, cfresponse2, cfresponse3] = await Promise.all([
                            axios.get(`https://codeforces.com/api/user.info?handles=${cfUsername}`),
                            axios.get(`https://codeforces.com/api/user.rating?handle=${cfUsername}`),
                            axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
                        ]);

                        const cfprofileData = cfresponse.data.result[0];
                        const ratingsData = cfresponse2.data.result;
                        const solvedProblemsData = cfresponse3.data.result;

                        // Get the last 5 contests or less
                        const recentContests = ratingsData.slice(-5).map(contest => ({
                            contestName: contest.contestName,
                            rank: contest.rank,
                            newRating: contest.newRating,
                            oldRating: contest.oldRating,
                            change: contest.newRating - contest.oldRating
                        }));

                        const newCodeforcesData = {
                            profile: {
                                handle: cfprofileData.handle,
                                avatar: cfprofileData.avatar || 'default_avatar.png',
                                maxRank: cfprofileData.maxRank,
                                maxRating: cfprofileData.maxRating,
                                currentRating: cfprofileData.rating || 'Unrated',
                                rank: cfprofileData.rank || 'Unranked'
                            },
                            contest: {
                                contestsParticipated: ratingsData.length,
                                maxRating: Math.max(...ratingsData.map(contest => contest.newRating), 0),
                                recentContest: ratingsData[ratingsData.length - 1]?.contestName || 'N/A',
                                recentContestRank: ratingsData[ratingsData.length - 1]?.rank || 'N/A',
                                recentContests: recentContests
                            },
                            solved: {
                                totalSolved: solvedProblemsData.filter(problem => problem.verdict === 'OK').length,
                                problemTags: solvedProblemsData
                                    .filter(problem => problem.verdict === 'OK')
                                    .map(problem => problem.problem.tags)
                                    .flat()
                                    .reduce((acc, tag) => {
                                        acc[tag] = (acc[tag] || 0) + 1;
                                        return acc;
                                    }, {})
                            }
                        };
                        newStats.cfStats = newCodeforcesData
                    } catch (error) {
                        console.log("error in codeforces stats fetch", error);

                    }

                }
                const {
                    codingHistory,
                    realTimeRatings,
                    achievements,
                    contestHistory,
                    analytics
                } = generateRandom(_id)
                newStats.codingHistory = codingHistory
                newStats.realTimeRatings = realTimeRatings
                newStats.achievements = achievements
                newStats.analytics = analytics
                newStats.contestHistory = contestHistory
                newStats.lastUpdated = currTime
                const updatedPortfolio = await Portfolio.findByIdAndUpdate(
                    _id,
                    { ...newStats },
                    { new: true, useFindAndModify: false }
                ).lean();
                res.status(200).json(updatedPortfolio)
                return;
            } else {
                res.status(200).json({ data: portfolioData })
                return;
            }
        } else {
            const { lcUsername, cfUsername, gfgUsername } = await User.findById(_id).lean()
            if (lcUsername) {
                try {


                    const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}`);
                    console.log("leetcode init")
                    const lcresponse2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/badges`);
                    const lcresponse3 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/solved`);
                    const response4 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/contest`);
                    const lcprofileData = response.data;
                    const badgesData = lcresponse2.data;
                    const solvedData = lcresponse3.data;
                    const contestData = response4.data;

                    const newleetcodedata = {
                        "profile": {
                            "name": lcprofileData.name,
                            "username": lcprofileData.username,
                            "avatar": lcprofileData.avatar,
                            "ranking": lcprofileData.ranking
                        },
                        "badges": badgesData,
                        "solved": {
                            "totalsolved": solvedData.solvedProblem,
                            "easy": solvedData.easySolved,
                            "medium": solvedData.mediumSolved,
                            "hard": solvedData.hardSolved,
                        },
                        "contest": {
                            "totalattended": contestData.contestAttend,
                            "contestRating": contestData.contestRating,
                            "contestGlobalRanking": contestData.contestGlobalRanking
                        }
                    }

                    newStats.lcStats = newleetcodedata;

                } catch (error) {
                    console.log("error in leetcode stats fetch", error)
                }
            }

            //codeforces
            if (cfUsername) {
                try {


                    const [cfresponse, cfresponse2, cfresponse3] = await Promise.all([
                        axios.get(`https://codeforces.com/api/user.info?handles=${cfUsername}`),
                        axios.get(`https://codeforces.com/api/user.rating?handle=${cfUsername}`),
                        axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
                    ]);

                    const cfprofileData = cfresponse.data.result[0];
                    const ratingsData = cfresponse2.data.result;
                    const solvedProblemsData = cfresponse3.data.result;

                    // Get the last 5 contests or less
                    const recentContests = ratingsData.slice(-5).map(contest => ({
                        contestName: contest.contestName,
                        rank: contest.rank,
                        newRating: contest.newRating,
                        oldRating: contest.oldRating,
                        change: contest.newRating - contest.oldRating
                    }));

                    const newCodeforcesData = {
                        profile: {
                            handle: cfprofileData.handle,
                            avatar: cfprofileData.avatar || 'default_avatar.png',
                            maxRank: cfprofileData.maxRank,
                            maxRating: cfprofileData.maxRating,
                            currentRating: cfprofileData.rating || 'Unrated',
                            rank: cfprofileData.rank || 'Unranked'
                        },
                        contest: {
                            contestsParticipated: ratingsData.length,
                            maxRating: Math.max(...ratingsData.map(contest => contest.newRating), 0),
                            recentContest: ratingsData[ratingsData.length - 1]?.contestName || 'N/A',
                            recentContestRank: ratingsData[ratingsData.length - 1]?.rank || 'N/A',
                            recentContests: recentContests
                        },
                        solved: {
                            totalSolved: solvedProblemsData.filter(problem => problem.verdict === 'OK').length,
                            problemTags: solvedProblemsData
                                .filter(problem => problem.verdict === 'OK')
                                .map(problem => problem.problem.tags)
                                .flat()
                                .reduce((acc, tag) => {
                                    acc[tag] = (acc[tag] || 0) + 1;
                                    return acc;
                                }, {})
                        }
                    };
                    newStats.cfStats = newCodeforcesData
                } catch (error) {
                    console.log("error in codeforces stats fetch", error);

                }

            }
            const {
                codingHistory,
                realTimeRatings,
                achievements,
                contestHistory,
                analytics
            } = generateRandom(_id)
            newStats.codingHistory = codingHistory
            newStats.realTimeRatings = realTimeRatings
            newStats.achievements = achievements
            newStats.analytics = analytics
            newStats.contestHistory = contestHistory
            newStats.lastUpdated = currTime

            newStats.user = _id;
            newStats.lastUpdated = currTime;
            // console.log(newStats)
            portfolioData = new Portfolio(newStats);
            // await portfolioData.lean();
            await portfolioData.save();
            res.status(200).json(portfolioData)
        }
        // const leetcodeResult =
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const generateRandom = (userId) => {
    const hash = crypto.createHash('sha256').update(userId).digest('hex');
    const seed = parseInt(hash.substring(0, 8), 16);

    const random = (min, max) => Math.floor((seed % (max - min + 1)) + min);

    const platforms = ['LeetCode', 'Codeforces', 'HackerRank', 'GeeksforGeeks'];
    const codingHistory = platforms.map(platform => ({
        platform,
        problemsSolved: random(50, 500)
    }));

    const realTimeRatings = new Map();
    platforms.forEach(platform => {
        realTimeRatings.set(platform, random(1000, 3000));
    });

    const achievements = Array.from({ length: random(1, 5) }, (_, i) => `Achievement ${i + 1}`);

    const contestHistory = Array.from({ length: random(1, 10) }, () => new mongoose.Types.ObjectId());

    const analytics = new Map();
    analytics.set('totalSubmissions', random(100, 1000).toString());
    analytics.set('acceptedSubmissions', random(50, 500).toString());

    return {
        codingHistory,
        realTimeRatings,
        achievements,
        contestHistory,
        analytics
    };
};


exports.forceUpdateStats = async (req, res) => {
    try {
        const _id = req.query._id;
        let portfolioData = await Portfolio.findById(_id);

        if (!portfolioData) {
            // Create a new portfolio for the user if it doesn't exist
            portfolioData = new Portfolio({ user: _id });
        }

        // Fetch new stats from external APIs and update the portfolio
        const { lcUsername, cfUsername, gfgUsername } = await User.findById(_id).lean();
        let newStats = {};

        if (lcUsername) {
            try {
                const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}`);
                const lcresponse2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/badges`);
                const lcresponse3 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/solved`);
                const response4 = await axios.get(`https://alfa-leetcode-api.onrender.com/${lcUsername}/contest`);
                const lcprofileData = response.data;
                const badgesData = lcresponse2.data;
                const solvedProblemsData = lcresponse3.data;
                const contestData = response4.data;

                // Process the data and update newStats
                newStats.lcStats = {
                    profileData: lcprofileData,
                    badges: badgesData,
                    solvedProblems: solvedProblemsData,
                    contest: contestData
                };
            } catch (error) {
                console.log("Error fetching LeetCode stats", error);
            }
        }

        //codeforces
        if (cfUsername) {
            try {


                const [cfresponse, cfresponse2, cfresponse3] = await Promise.all([
                    axios.get(`https://codeforces.com/api/user.info?handles=${cfUsername}`),
                    axios.get(`https://codeforces.com/api/user.rating?handle=${cfUsername}`),
                    axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
                ]);

                const cfprofileData = cfresponse.data.result[0];
                const ratingsData = cfresponse2.data.result;
                const solvedProblemsData = cfresponse3.data.result;

                // Get the last 5 contests or less
                const recentContests = ratingsData.slice(-5).map(contest => ({
                    contestName: contest.contestName,
                    rank: contest.rank,
                    newRating: contest.newRating,
                    oldRating: contest.oldRating,
                    change: contest.newRating - contest.oldRating
                }));

                const newCodeforcesData = {
                    profile: {
                        handle: cfprofileData.handle,
                        avatar: cfprofileData.avatar || 'default_avatar.png',
                        maxRank: cfprofileData.maxRank,
                        maxRating: cfprofileData.maxRating,
                        currentRating: cfprofileData.rating || 'Unrated',
                        rank: cfprofileData.rank || 'Unranked'
                    },
                    contest: {
                        contestsParticipated: ratingsData.length,
                        maxRating: Math.max(...ratingsData.map(contest => contest.newRating), 0),
                        recentContest: ratingsData[ratingsData.length - 1]?.contestName || 'N/A',
                        recentContestRank: ratingsData[ratingsData.length - 1]?.rank || 'N/A',
                        recentContests: recentContests
                    },
                    solved: {
                        totalSolved: solvedProblemsData.filter(problem => problem.verdict === 'OK').length,
                        problemTags: solvedProblemsData
                            .filter(problem => problem.verdict === 'OK')
                            .map(problem => problem.problem.tags)
                            .flat()
                            .reduce((acc, tag) => {
                                acc[tag] = (acc[tag] || 0) + 1;
                                return acc;
                            }, {})
                    }
                };
                newStats.cfStats = newCodeforcesData
            } catch (error) {
                console.log("error in codeforces stats fetch", error);

            }
        }


        newStats.lastUpdated = new Date();
        portfolioData = await Portfolio.findByIdAndUpdate(
            _id,
            { ...newStats },
            { new: true, useFindAndModify: false }
        );

        return res.status(200).json(portfolioData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};