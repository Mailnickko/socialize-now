const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/thesis';
const options = {promiseLibrary: require('bluebird')};
mongoose.Promise = require('bluebird');

module.exports = mongoose.connect(uri, options);
