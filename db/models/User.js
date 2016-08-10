const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: String,
  events: Object
});

const User = mongoose.model('User', userSchema);

module.exports = User;
