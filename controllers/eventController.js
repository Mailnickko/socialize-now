const { consultNetwork } = require('../consultationHelpers/neuralHelpers');
const Event = require('../db/models/Event');
const User = require('../db/models/User');
const { sendNotification } = require('../notificationHelpers/emailHelpers')
const io = require('../server');

module.exports.createEvent = (constraints, creator) => {

  return Event.create({
    date: constraints.date,
    time: constraints.time,
    name: constraints.name,
    isVoting: false,
    voteCompleted: false,
    winnerDecided: false,
    creator: creator,
    users: [creator],
    bulletinBoard: {},
    constraints: constraints,
    choice: [],
    choices: []
  });

};

module.exports.getEvents = userId => {
  //Gets all events stored in database, filters for only those events where userId is in event.users array
  return Event.find({})
    .then( events => {
      return events.filter( event => {
       return event.users.indexOf(userId) > -1;
      });
    });
};

module.exports.getEvent = (eventId, userId) => {
  return Event.findOne({_id: eventId})
    .then( event => {
      if(event.users.indexOf(userId) === -1){
        event.users.push(userId);
        event.choice = event.choice || {};
        event.bulletinBoard = event.bulletinBoard || {};
        event.save();
      }
      return event;
    })
};

module.exports.beginEventVote = eventId => {
  return Event.findOne({_id: eventId})
    .then( event => {
      event.startVoting();
    });
};

module.exports.endEventVote = (winningEvent, eventId) => {
  console.log("INCONTROLLER", winningEvent)
  return Event.findOne({_id: eventId})
    .then( event => {
      event.completeVoting();
      event.setWinner(winningEvent);
    })
};

module.exports.upVote = () => {

};

module.exports.downVote = () => {

};

module.exports.inviteUser = (eventId, creatorId, inviteeEmail) => {
  let creatorEmail, creatorName, subject, body;
  //retrieve creator email from creator's user object, set subject, set body trigger email helper function
  User.findOne({userId: creatorId})
    .then(user => {
      subject = `${user.name} has invited you to an event!`;
      body = `Please go to <a href="http://socialstarter.herokuapp.com/polling/${eventId}">http://socialstarter.herokuapp.com/polling/${eventId}</a> to join the fun!`;
      sendNotification(user.email, inviteeEmail, subject, body);
    })
    .catch(err => console.log(err));
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
