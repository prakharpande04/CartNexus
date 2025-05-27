const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
