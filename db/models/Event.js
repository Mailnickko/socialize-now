const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: Date, //Date of event
  isVoting: Boolean, //if true render voting view, if false render invitation view
  voteCompleted: Boolean, //if true render bulletin board view
  users: Array, //Users that accepted inviation
  invited: Array, //Invited Users
  bulletinBoard: Object, //Event details, photos and comments
  constraints: Object, //User inputted constraints for event
  choice: Object, //Details of selected object
  choices: Array, //Choices up for vote
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
