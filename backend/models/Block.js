const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Block schema
const BlockSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  library: {
    type: String,
    required: true,
  },
  media: {
    type: String,  // URL to an image or media file
    required: true,
  },
  content: {
    type: String,  // HTML or content that represents the block
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,  // Reference to the Category model
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,  // Reference to the Subcategory model
    ref: 'Category.subcategories',
    required: true,
  },
  subclassification: {
    type: Schema.Types.ObjectId,  // Reference to the Subclassification model
    ref: 'Category.subcategories.subclassifications',
    required: true,
  }
});

// Create Block model
const Block = mongoose.model('Block', BlockSchema);

module.exports = Block;
