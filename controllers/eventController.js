import { consultNetwork } from '../neuralHelpers/neuralHelpers';
import Event from '../models/Event';

module.exports.createEvent = () => {
  return Event.create({});
};

module.exports.inviteUsers = (emails, eventId) => {
  //Sends invitation with link to inviation page to each email in emails
};

module.exports.userJoin = () => {
  //user should be added to event's users array
};

module.exports.getRecommendations = (users) => {
  //map users from array of users to array of historical tags
  //pass into consultNetwork
  //return array of choice objects
};

module.exports.addWriteIn = () => {
  //add write in choice to event
};

module.exports.submitVote = () => {
  //
};

module.exports.finalizeChoice = () => {

};
