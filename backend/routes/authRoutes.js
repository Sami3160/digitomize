const express = require('express');
const passport = require('passport')
const { User } = require('../models/User');
// const { getAllContests, getContestById, addContest } = require('../controllers/contestController.js');
const router = express.Router();
const axios = require('axios');

//authentitate user by google
router.get('/google/callback', passport.authenticate('google', {
    successMessage: "User successfully logged in",
    failureMessage: "User failed to log in",
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login/failed"
}, (req, res) => {
    console.log("req came /google/callback");

    const token = req.user.token;
    res.cookie('token', token, { httpOnly: true });
    res.redirect('http://localhost:5173');
}));


///forward the reques to google auth server
router.get('/auth/google', async (req, res) => {
    try {
        console.log("req came /auth/google");
        
        const response = await
         axios.get("https://accounts.google.com/o/oauth2/v2/auth", {
            params: req.query
        })

        console.log(response);
        res.send(response.data);

    } catch (error) {
        console.log(error)
        res.error(500).json({ error: "Internal server message" })
    }
});

router.get('/login/success', async (req, res) => {

    if (req.user) {
        console.log(req.user);
        console.log("req came /login/success");


        const user = await User.findOne({ email: req.user._json.email });
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, { expiresIn: '4h' });
            res.status(201).json({ token, savedUser, message: "User created successfully" });
        } else {
            const newUser = new User({
                username: req.user._json.name,
                email: req.user._json.email,
                firstname: req.user._json.name,
                lastname: "empty",
                password: Date.now(),//dummy password
                bio: "",
            });

            const savedUser = await newUser.save();
            console.log(savedUser);
            const token = jwt.sign({ userId: savedUser._id }, "secret", { expiresIn: '4h' });
            res.status(201).json({ token, savedUser, message: "User created successfully" });
        }
    } else {
        res.status(403).json({ message: "User not logged in" })
        throw new Error("Not Authorised")
    }

})


router.get('/login/failed', (req, res) => {
    res.status(401).json({ message: "Auth failed" })
    throw new Error("Login failed")
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err);
        }
        res.redirect("/")
    })
})
module.exports = router;
