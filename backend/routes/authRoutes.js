const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { getAllContests, getContestById, addContest } = require('../controllers/contestController.js');
const router = express.Router();
const axios = require("axios");

//authentitate user by google
router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      successMessage: "User successfully logged in",
      failureMessage: "User failed to log in",
      successRedirect: "http://localhost:5173/",
      failureRedirect: "http://localhost:5173/login/failed",
    },
    (req, res) => {
      console.log("req came /google/callback");

      const token = req.user.token;
      res.cookie("token", token, { httpOnly: true });
      res.redirect("http://localhost:5173");
    }
  )
);

///forward the reques to google auth server
router.post("/google", async (req, res) => {
  console.log("auth pinged");
  // console.log(req?.body?.params);
  if (!req?.body?.params?.access_token) {
    return res.status(400).json({ message: "No access token provided" });
  }
  try {
    console.log("req came /auth/google");

    const response = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${req?.body?.params?.access_token}` },
      })
      .then((res) => res.data);
    console.log(response);
    const email = response?.email;
    if (!email) {
       // Handle cases where Google doesn't return an email
       console.error("No email received from Google.");
       return res.status(400).json({ message: "Could not retrieve email from Google." });
    }
    // res.send(response.data)
    const moreUserInfo = await User.findOne({ email: email }).select(
      "-password"
    );
    if(!moreUserInfo){
      return res.status(401).json({message: "User not found"});
    }
    const token = jwt.sign(
      { userId: moreUserInfo._id },
      process.env.SESSION_SECRET,
      {
        expiresIn: "4h",
      }
    );
    console.log(token);
    console.log(moreUserInfo);
    return res
      .status(200)
      .json({ token, userInfo:moreUserInfo, message: "User logged in successfully" });

    // res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server message" });
  }
});

// router.post("/google/demo", async (req, res) => {
//   const { access_token } = req.body;

//   try {
//     // Use the access_token to fetch user info from Google
//     const response = await axios
//       .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//         headers: { Authorization: `Bearer ${access_token}` },
//       })

//     const { email, name } = response.userInfo;

//     console.log("shssh");
//     console.log(email);

//     const user = await User.findOne({ email });

//     if (user) {
//       console.log("User found:", user);
//       const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
//         expiresIn: "4h",
//       });
//       res
//         .status(200)
//         .json({ token, user, message: "User logged in successfully" });
//     } else {
//       console.log("Creating new user");
//       const newUser = new User({
//         username: name, // Use the name from Google
//         email: email,
//         firstname: name,
//         lastname: "empty",
//         password: Date.now().toString(), // Dummy password
//         bio: "",
//       });

//       const savedUser = await newUser.save();
//       console.log("New user created:", savedUser);

//       const token = jwt.sign(
//         { userId: savedUser._id },
//         process.env.SESSION_SECRET,
//         {
//           expiresIn: "4h",
//         }
//       );
//       res
//         .status(201)
//         .json({ token, savedUser, message: "User created successfully" });
//     }

//     //   // Check if the user exists in your database
//     //   let user = await User.findOne({ email });

//     //   // If the user doesn't exist, create a new user
//     //   if (!user) {
//     //     user = new User({ email, name });
//     //     await user.save();
//     //   }

//     //   // Generate a token for the user
//     //   const token = generateToken(user._id);

//     //   // Return the token and user info
//     //   res.status(200).json({ token, user });
//   } catch (error) {
//     console.error("Google authentication error:", error);
//     res.status(500).json({ message: "Google authentication failed." });
//   }
// });

router.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    console.log("req came /login/success");

    const user = await User.findOne({ email: req.user._json.email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
        expiresIn: "4h",
      });
      res
        .status(201)
        .json({ token, savedUser, message: "User created successfully" });
    } else {
      const newUser = new User({
        username: req.user._json.name,
        email: req.user._json.email,
        firstname: req.user._json.name,
        lastname: "empty",
        password: Date.now(), //dummy password
        bio: "",
      });

      const savedUser = await newUser.save();
      console.log(savedUser);
      const token = jwt.sign({ userId: savedUser._id }, "secret", {
        expiresIn: "4h",
      });
      res
        .status(201)
        .json({ token, savedUser, message: "User created successfully" });
    }
  } else {
    res.status(403).json({ message: "User not logged in" });
    throw new Error("Not Authorised");
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "Auth failed" });
  throw new Error("Login failed");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
