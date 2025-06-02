const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  expectedDelivery: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return now;
    }
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);