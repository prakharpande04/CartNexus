const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true }, // For quick reference (optional)
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // Price per item at the time of addition
}, { _id: false });

module.exports = cartItemSchema;
