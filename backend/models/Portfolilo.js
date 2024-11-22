const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  codingHistory: [{ platform: String, problemsSolved: Number }],
  realTimeRatings: { type: Map, of: Number },
  achievements: [String],
  contestHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
  analytics: { type: Map, of: String },
  lastUpdated: {
    type: Date,
    default:Date.now
  },
  lcStats:{type :Object},
  gfgStats:{type :Object},
  cfStats:{type :Object},
  ccStats:{type :Object},
});

module.exports = mongoose.model("Portfolio", portfolioSchema);