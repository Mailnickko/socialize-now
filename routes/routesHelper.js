const User = require('../db/models/User');
const Choice = require('../db/models/Choice');
const Event = require('../db/models/Event');
const db = require('../db/config');

module.exports.createUser = (username, email) => {
  return User.create({username, email});
};

module.exports.deleteUser = (username) => {
  return User.remove({username}).exec();
};
