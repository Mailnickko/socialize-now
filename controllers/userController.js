const User = require('../db/models/User');
const Choice = require('../db/models/Choice');
const Event = require('../db/models/Event');
const db = require('../db/config');

module.exports.createUser = (req, res) => {
  User.create({username: req.body.username, email: req.body.email})
    .then(res.status(200).send('Success'));
};

module.exports.deleteUser = (username) => {
  User.remove({username})
    .then();
};
