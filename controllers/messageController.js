const Message = require('../db/models/Message');
const db = require('../db/config');

module.exports.getMessage = (req, res) => {
  Message.find()
    .then(function(result){
      res.status(200).json(result)
    });
};

module.exports.addMessage = (req, res) => {
  Message.create({username: req.body.username, message: req.body.message, eventId: req.body.eventId})
    .then(res.status(200).send('Success'));
};
