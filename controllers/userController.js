const User = require('../db/models/User');
const db = require('../db/config');


//Checks to see if user exists
  //if not, creates a new user and returns promise
  //if user exists, returns user object in a promise
module.exports.createUser = (userId, picture, email, name) => {
  User.findOne({userId})
    .then( user => {
      if(!user){
        return User.create({ userId, picture , email, name});
      } else {
        return user;
      }
    });
};

module.exports.deleteUser = userId => {
  return User.remove({userId: userId});
};

module.exports.findUser = userId => {
  return User.find({userId: userId});
}
