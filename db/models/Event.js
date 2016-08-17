const mongoose = require('mongoose');
const { consultYelp } = require('../../consultationHelpers/apiHelpers');

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
  choice: {type: Array}, //Details of selected object
  choices: {type: Array}, //Choices up for vote

});

eventSchema.methods.startVoting = function() {
  this.isVoting = true;
  this.save();
};

eventSchema.methods.completeVoting = function() {
  this.voteCompleted = true;
  this.save();
};

eventSchema.methods.setWinner = function(winningEvent) {
  this.choice.push(winningEvent);
  this.save();
};

eventSchema.methods.getRecommendations = function(eventId, userId) {
  let recommendations = consultYelp([], 'San Francisco');
  let tags = [];
  let choices = [];

  return recommendations
    .then( yelpResults => {
      choices = yelpResults.map(business => {
        return {
          name: business.name,
          imageURL: business.image_url,
          rating: business.rating,
          ratingImg: business.rating_img_url,
          reviewCount: business.review_count,
          url: business.url
        }
      });


      this.choices = choices;
      this.save();
      return this;
    });
};


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
