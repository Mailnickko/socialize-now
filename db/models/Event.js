const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {type: String, required: true}, //Date of event
  time: {type: String, required: true}, //Time of event,
  name: {type: String, required: true},
  isVoting: {type: Boolean, required: true}, //if true render voting view, if false render invitation view
  voteCompleted: {type: Boolean, required: true}, //if true render bulletin board view
  creator: {type: String, required: true}, //Creator of the event
  users: {type: Array}, //Users that accepted inviation
  invited: {type: Array}, //Invited Users
  bulletinBoard: {type: Object, required: true}, //Event details, photos and comments
  constraints: {type: Object, required: true}, //User inputted constraints for event
  winnerDecided: {type: Boolean, required: true},
  choice: {type: Array}, //Details of selected object
  choices: {type: Array}, //Choices up for vote
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
