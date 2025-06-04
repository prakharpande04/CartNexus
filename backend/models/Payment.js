const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  }, 

  referenceId: {
    type: String,
    required: true, 
    unique: true
  },

  transactionStatus: {
    type: String,
    required: true
  },

  paymentMode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
