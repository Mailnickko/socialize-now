const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
  tags: Array, //Categories choice is associated with
  time: Date, //Specific time event will take place
  cost: Number, //Cost for one person to participate in choice
  description: String, //Description of choice
  imageURL: String, //Image used for choice
  link: String, //URL for more details about choice
  isUserInput: String, //Was this choice a write in?
  name: String, //Name of choice
  location: String, //Address of choice
  rating: Number, //Rating from API
});

const Choice = mongoose.model('Choice', choiceSchema);

module.exports = Choice;
