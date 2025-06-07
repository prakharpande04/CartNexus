const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  fullName: { type: String,  },
  email: { type: String, unique: true },
  phone: { type: String,  },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  avatarUrl: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
