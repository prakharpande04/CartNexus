const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false }); // _id disabled for embedded use

module.exports = addressSchema;