const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {type: String, unique: true},
  email: String,
  picture: String,
  name: String,
  events: { type: Array, default: [] },
  tags: { type: Array, default: [] }
}, {timestamps: { createdAt: 'created_at' }});

const User = mongoose.model('User', userSchema);

module.exports = User;
