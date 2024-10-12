const mongoose = require('mongoose');
const { Schema } = mongoose;



const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },  // e.g., Codeforces, LeetCode
  date: { type: Date, required: true },
  difficulty: { type: String },
  link: { type: String, required: true },
  duration: { type: Number },  // In hours
});


const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;
