const mongoose = require('mongoose');
const { createAndConsultNetwork } = require('../../consultationHelpers/neuralHelpers');
const { consultYelp, convertYelpCategoryToOurTag, deepEquals } = require('../../consultationHelpers/apiHelpers');
const noImg = "https://placeholdit.imgix.net/~text?txtsize=50&txt=Sorry,%20Image%20Unavailable&w=350&h=150";

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
  userTags: {type: Object, default:{}}
});

eventSchema.methods.startVoting = function() {
  this.isVoting = true;
  this.save();
  return this;
};

eventSchema.methods.completeVoting = function() {
  this.voteCompleted = true;
  this.save();
  return this;
};

eventSchema.methods.setWinner = function(winningEvent) {
  this.choice.push(winningEvent);
  this.save();
};

eventSchema.methods.getRecommendations = function(userTags, location) {
  if (deepEquals(userTags, [[]])) {
    userTags = [[{ tags: "popular" }]];
  }
  let suggestedTags = createAndConsultNetwork(userTags);
  let recommendations = consultYelp(suggestedTags[0], location);
  let tags = [];

  return recommendations
    .then( yelpResults => {
      return yelpResults.map(business => {
        const ourTags = business.categories.map(category => convertYelpCategoryToOurTag(category));
        return {
          name: business.name,
          imageURL: business.image_url || noImg,
          rating: business.rating,
          ratingImg: business.rating_img_url_large,
          reviewCount: business.review_count,
          url: business.url,
          netVotes: 0,
          upVotedUsers: {},
          downVotedUsers: {},
          address: business.location.display_address,
          tags: ourTags
        }
      });
    })
    .then( suggestions => {
      this.choices = suggestions;
      this.save();
      return this;
    })
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
