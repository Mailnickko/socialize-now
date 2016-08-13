const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: String,
  events: Object,
  userId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
