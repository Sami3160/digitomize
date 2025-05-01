const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { deleteOnCloudinary, uploadOnCloudinary } = require("./cloudnary");

exports.registerUser = async (req, res) => {
  const { email, password, confirmpassword, firstname, lastname } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password != confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const username = `${firstname} ${lastname}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      firstname,
      lastname,
      password: hashedPassword,
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLeetCodeHeatData = async (req, res) => {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  console.log("gettning heat data");

  const data = await response.json();
  res.json(data);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user = await User.findOne({ email }).select("-password");

    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "4h" });
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      password,
      institute,
      address,
      bio,
      _id,
    } = req.body;
    // console.log(req.body);
    let data = {};
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (username) data.username = username;
    if (institute) data.institute = institute;
    if (address) data.address = address;
    if (bio) data.bio = bio;
    console.log(req.body);
    console.log(_id);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        { _id },
        {
          password: hashedPassword,
        }
      );
    }

    const user = await User.updateOne({ _id }, { ...data });
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  // console.table(req.file)
  const { _id } = req.body;
  console.log("body : ", req.body);
  try {
    const result = await uploadOnCloudinary(req.file.path, "profile");
    // console.log("result: ",result)
    const public_id = await User.findById({ _id }).select("public_id");
    if (public_id) {
      await deleteOnCloudinary(public_id);
    }
    await User.findOneAndUpdate(
      { _id },
      { profileUrl: result.url, public_id: result.public_id }
    );
    return res
      .status(200)
      .json({ message: "Image uploaded successfully 1", result });
  } catch (error) {
    console.log("huihiu ", error);
    return res.status(500).json({ message: "Error in uploading image", error });
  }
};

exports.getSafeUserData = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.param)
    const user = await User.findById(req.query.user_id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for linking accounts
exports.linkAccounts = async (req, res) => {
  const { _id, platform } = req.query; // Extract user ID and platform from query params
  const { username } = req.body; // Extract the username from the request body
  console.log(_id, platform, username);
  // Map of platforms to database fields
  const validPlatforms = {
    leetcode: "lcUsername",
    codeforces: "cfUsername",
    gfg: "gfgUsername",
    codechef: "ccUsername",
    hackerrank: "hrUsername",
    github: "githubUsername",
    codingninjas: "cnUsername",
  };

  // Get the field to update based on the platform
  const fieldToUpdate = validPlatforms[platform?.toLowerCase()];

  // Validate platform
  if (!fieldToUpdate) {
    return res.status(400).json({ error: "Invalid platform specified" });
  }

  try {
    // Update the user's account details
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { [fieldToUpdate]: username },
      { new: true } // Return the updated document
    );

    // Handle case where user is not found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user
    res.status(200).json({
      message: `${platform} account linked successfully!`,
      updatedUser,
    });
    // console.log("new:",updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while linking accounts" });
  }
};

exports.unlinkAccount = async (req, res) => {
  const { _id, platform } = req.query; // Extract user ID and platform from query params

  // Map of platforms to database fields
  const validPlatforms = {
    leetcode: "lcUsername",
    codeforces: "cfUsername",
    gfg: "gfgUsername",
    codechef: "ccUsername",
    hackerrank: "hrUsername",
    github: "githubUsername",
    codingninjas: "cnUsername",
  };

  // Get the field to clear based on the platform
  const fieldToClear = validPlatforms[platform?.toLowerCase()];

  // Validate platform
  if (!fieldToClear) {
    return res.status(400).json({ error: "Invalid platform specified" });
  }

  try {
    // Update the user's account details by setting the field to null
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { [fieldToClear]: null }, // Clear the specific platform field
      { new: true } // Return the updated document
    );

    // Handle case where user is not found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user
    res.status(200).json({
      message: `${platform} account unlinked successfully!`,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while unlinking the account" });
  }
};




exports.updateViewCount = async (req, res) => {
  const { _id } = req.body;
  const { userId } = req.body;
  
  try {
    const userViewInfo=await User.findByIdAndUpdate(userId,
      {
        $set: {
          [`views.${_id}`]: new Date() 
        }
      },
      { new: true } )
      res.status(200).json(userViewInfo)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
