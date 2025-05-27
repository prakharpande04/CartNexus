const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true }, // e.g., '09/30'
  cvv: { type: String, required: true }
}, { _id: false }); // _id disabled for embedded use

module.exports = paymentSchema;
