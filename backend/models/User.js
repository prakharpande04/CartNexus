const mongoose = require('mongoose');
const addressSchema = require('./Address');
const paymentSchema = require('./Payment');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  address: { type: addressSchema, required: true },
  payment: { type: paymentSchema, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
