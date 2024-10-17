const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname:{type:String, required : true},
    lastname:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ratings: { type: Map, of: Number }, 
    contestsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
    achievements: [String],  
    bio: String,
    profileUrl:{
        type:String,
        default:'https://res.cloudinary.com/dv0xm4c4v/image/upload/v1633199598/contest-portfolio/default-profile-image_fy3j9s.png'
    }
});

module.exports = mongoose.model("User", userSchema);