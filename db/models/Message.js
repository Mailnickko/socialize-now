const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  eventId: String
},
{
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
