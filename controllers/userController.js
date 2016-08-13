const User = require('../db/models/User');
const db = require('../db/config');

module.exports.createUser = (req, res) => {
  return User.create({username: req.body.username, email: req.body.email, events: [], userId: req.body.userId});
};

module.exports.deleteUser = (userId) => {
  return User.remove({userId: userId});
};
