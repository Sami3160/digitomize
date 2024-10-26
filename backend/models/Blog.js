const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Block schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1683525313231/RC4cg5koq.png?w=1600&h=840&fit=crop&crop=entropy&auto=format&auto=compress,format&format=webp',
  },
  content: {
    type: String,  
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
  category: {
    type: 'String',
    enum: ['Article', 'Tutorial', 'Project', 'Challenge'],
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type: Date,
    default:Date.now
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  comments:{
    type: [mongoose.Schema.Types.ObjectId],
    ref:'Comment'
  }
});

// Create Block model
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
