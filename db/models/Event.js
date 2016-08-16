const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {type: String}, //Date of event
  time: {type: String}, //Time of event,
  name: {type: String},
  isVoting: {type: Boolean}, //if true render voting view, if false render invitation view
  voteCompleted: {type: Boolean}, //if true render bulletin board view
  creator: {type: String}, //Creator of the event
  users: {type: Array}, //Users that accepted inviation
  bulletinBoard: {type: Object}, //Event details, photos and comments
  constraints: {type: Object}, //User inputted constraints for event
  winnerDecided: {type: Boolean},
  choice: {type: Object}, //Details of selected object
  choices: {type: Array} //Choices up for vote
});

eventSchema.methods.startVoting = function() {
  this.isVoting = true;
  this.save();
}

eventSchema.methods.completeVoting = function() {
  this.voteCompleted = true;
  this.save();
}


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
