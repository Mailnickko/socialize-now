const { consultNetwork } = require('../consultationHelpers/neuralHelpers');
const Event = require('../db/models/Event');
const User = require('../db/models/User');

module.exports.createEvent = (constraints, creator) => {

  return Event.create({
    date: constraints.date,
    time: constraints.time,
    name: constraints.name,
    isVoting: false,
    voteCompleted: false,
    creator: creator,
    users: [creator],
    invited: [],
    bulletinBoard: {},
    constraints: constraints,
    choice: {},
    choices: []
  });

};

module.exports.getEvents = userId => {
  //Gets all events stored in database, filters for only those events where userId is in event.users array
  return Event.find({})
    .then( events => {
      console.log(events);
      return events.filter( event => {
       return event.users.indexOf(userId) > -1;
      });
    });
};

module.exports.getEvent = eventId => {
  return Event.find({_id: eventId});
};

module.exports.upVote = () => {

};

module.exports.downVote = () => {

};

module.exports.inviteUsers = (emails, eventId) => {
  //Sends invitation with link to inviation page to each email in emails
};

module.exports.setActiveUsers = () => {

};

module.exports.removeActiveUsers = () => {

};

module.exports.userJoin = () => {
  //user should be added to event's users array
};

module.exports.submitUserVote = () => {
  //
};

module.exports.stopEventVote = () => {

};

module.exports.finalizeChoice = () => {

};

module.exports.getRecommendations = (users) => {
  //map users from array of users to array of historical tags
  //pass into consultNetwork
  //return array of choice objects
};

module.exports.addWriteIn = () => {
  //add write in choice to event
};
