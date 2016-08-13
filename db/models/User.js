const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: String,
  picture: String,
  events: { type: Array, default: [] }
}, {timestamps: { createdAt: 'created_at' }});

const User = mongoose.model('User', userSchema);

module.exports = User;
