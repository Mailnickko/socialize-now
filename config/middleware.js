const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

module.exports = function (app, express) {
  app.use(allowCrossDomain);
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../client/build')));
};
