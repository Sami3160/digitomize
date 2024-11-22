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


exports.getLeetcodeContests = async (req, res) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "INGRESSCOOKIE=16456f8ff2895d042b928d33c209d438|8e0876c7c1464cc0ac96bc2edceabd27; __cf_bm=DTfFIoPAFbJP2emzhruuYJWtCazexl2aanHntZv2Baw-1729186046-1.0.1.1-RyOO3HjDkcZ.U5iZ4rlum4blCdkceUJWUpFRWO7KE1MTteClSDmT5JpCT_lwopdl0SqtmBdbbJdTG5q_GwwMhg; csrftoken=VjnisRnGhHcJcI4nwUFLufjF5FMbOKDYIRa2mnT3T5wRyGz8JMsUHdfBNXgOdL1l");

    const graphql = JSON.stringify({
        query: " query {\n        allContests {\n          title\n          startTime\n          duration\n        titleSlug\n        }\n      }",
        variables: {}
    })
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow"
    };
    fetch("https://leetcode.com/graphql", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const upcommingContest = JSON.parse(result)["data"]["allContests"].filter((contest) => contest.startTime * 1000 > Date.now());
            const contests = upcommingContest.map((contest) => {
                const hours = Math.floor(contest.duration / 3600);
                const minutes = Math.floor((contest.duration % 3600) / 60);
                // const duration = `${hours}h ${minutes}m`;
                return {
                    name: contest.title,
                    platform: "Leetcode",
                    date: new Date(contest.startTime * 1000).toLocaleString(),
                    // difficulty: "Easy",
                    link: `https://leetcode.com/contest/${contest.titleSlug}`,
                    duration: contest.duration/3600+" hours"
                }
            })
            res.json({ message: "success",contests });
        })
        .catch((error) => {
            if (!res.headersSent) {
                res.status(500).json({ message: error.message });
            }
        });
}

