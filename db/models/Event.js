const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {type: Date, required: true}, //Date of event
  time: {type: String, required: true}, //Time of event
  isVoting: {type: Boolean, required: true}, //if true render voting view, if false render invitation view
  voteCompleted: {type: Boolean, required: true}, //if true render bulletin board view
  creator: {type: String, required: true}, //Creator of the event
  users: {type: Object, required: true}, //Users that accepted inviation
  invited: {type: Object, required: true}, //Invited Users
  bulletinBoard: {type: Object, required: true}, //Event details, photos and comments
  constraints: {type: Object, required: true}, //User inputted constraints for event
  choice: {type: Object, required: true}, //Details of selected object
  choices: {type: Object, required: true}, //Choices up for vote
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
