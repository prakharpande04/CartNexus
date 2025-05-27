const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: String }, // Assuming userId is unique for each user
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String }
});
module.exports = mongoose.model('Address', addressSchema);