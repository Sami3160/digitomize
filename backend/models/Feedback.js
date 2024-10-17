// models/Feedback.js
const mongoose = require('mongoose');

// Define Feedback Schema
const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  views: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  bannerUrl: {
    type: String,
    required: false,
  }
});

// Create Feedback Model
const Blog = mongoose.model('Blogs', blogSchema);

module.exports = Blog;
