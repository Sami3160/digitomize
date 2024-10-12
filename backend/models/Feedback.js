// models/Feedback.js
const mongoose = require('mongoose');

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  improvement: {
    type: String,
    required: true,
  },
  bugs: {
    type: String,
    required: false,
  },
});

// Create Feedback Model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
