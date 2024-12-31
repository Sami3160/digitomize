const Contest = require('../models/Contest');
const axios = require('axios');
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
                    duration: contest.duration / 3600 + " hours"
                }
            })
            res.json({ message: "success", contests });
        })
        .catch((error) => {
            if (!res.headersSent) {
                res.status(500).json({ message: error.message });
            }
        });
}



exports.getAllContestsApi = async (req, res) => {
    console.log('checking server');
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 28);

    // Format dates to ISO 8601 (required for the API)
    const formatDate = date => date.toISOString().split('.')[0] + 'Z';
    const timeMin = formatDate(today);
    const timeMax = formatDate(maxDate);

    // Base API URL
    const baseUrl = 'https://clients6.google.com/calendar/v3/calendars/iu1iul1u3n8ic3s78f4df15u4o%40group.calendar.google.com/events';

    // API key and other query parameters
    const params = {
        calendarId: 'iu1iul1u3n8ic3s78f4df15u4o@group.calendar.google.com',
        singleEvents: true,
        eventTypes: ['default', 'focusTime', 'outOfOffice'],
        timeZone: 'GMT+05:30',
        maxAttendees: 1,
        maxResults: 250,
        sanitizeHtml: true,
        timeMin,
        timeMax,
        key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
    };

    try {
        // Fetch data from the API
        const response = await axios.get(baseUrl, { params });
        const data = response.data;

        // Filter and group data by platform extracted from the summary
        console.log('Fetched Events:', data.items.length);
        const groupedEvents = data.items.reduce((acc, event) => {
            // Extract platform from summary using regex
            const platformMatch = event.summary.match(/\[(.*?)\]/);
            const platform = platformMatch ? platformMatch[1] : 'Other';

            if (!acc[platform]) acc[platform] = [];
            acc[platform].push({
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
                description: event.description || 'No description'
            });

            return acc;
        }, {});

        // Output grouped data
        res.status(200).json({ message: 'Success', data: groupedEvents });
    } catch (error) {
        console.log(error);
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: error.message });
    }

}