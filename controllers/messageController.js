const Message = require('../db/models/Message');
const db = require('../db/config');
const io = require('../server');

module.exports.getMessage = (req, res) => {
  Message.find({eventId: req.body.eventId})
    .then(function(result) {
      res.status(200).json(result);
    });
};

module.exports.addMessage = (req, res) => {
  Message.create({username: req.body.username, message: req.body.message, eventId: req.body.eventId})
    .then(io.io.sockets.in(req.body.eventId).emit('message'))
    .then(res.status(200).send('Success'));
};

module.exports.togglePin = (messageId) => {
  Message.find({_id: messageId})
    .then( message => {
      message.pinned = !message.pinned;
      message.save();
      //socketio event to get everyone to update messages
    })

};