const User = require('../db/models/User');
const db = require('../db/config');

module.exports.createUser = (username, picture, email) => {
  return User.create({ username, picture , email });
};

module.exports.deleteUser = (userId) => {
  return User.remove({userId: userId});
};
