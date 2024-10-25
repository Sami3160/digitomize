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
    institute: String,
    address: String,
    profileUrl:{
        type:String,
        default:'https://www.llt.at/wp-content/uploads/2021/11/blank-profile-picture-g77b5d6651-1280-705x705.png'
    }
});

module.exports = mongoose.model("User", userSchema);