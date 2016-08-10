const User = require('../db/models/User');
const db = require('../db/config');

module.exports.createUser = (req, res) => {
  User.create({username: req.body.username, email: req.body.email, events: []
  })
    .then(res.status(200).send('Success'));
};

module.exports.deleteUser = (username) => {
  User.remove({username})
    .then();
};
