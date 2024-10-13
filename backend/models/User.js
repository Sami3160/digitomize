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
});

module.exports = mongoose.model("User", userSchema);