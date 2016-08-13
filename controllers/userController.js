const User = require('../db/models/User');
const db = require('../db/config');

module.exports.createUser = (userId, picture, email, name) => {
  return User.create({ userId, picture , email, name});
};

module.exports.deleteUser = (userId) => {
  return User.remove({userId: userId});
};
