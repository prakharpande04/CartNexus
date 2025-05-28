const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,     // ensures no duplicate productId
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: '', // URL to image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
