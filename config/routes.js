const { createUser, deleteUser } = require('../controllers/userController');
const { getMessage, addMessage } = require('../controllers/messageController');
const { createEvent, getEvent, getEvents } = require ('../controllers/eventController');
const jwt = require('express-jwt');
const secrets = require('./secrets');

let jwtAuth = jwt({secret: new Buffer(secrets.jwtSecret || process.env.AUTH0_SECRET, 'base64')})

module.exports = function routes(app, express) {
  app.route('/message')
    .get(getMessage)
    .post(addMessage);

  app.post('/user', jwtAuth,
    (req, res) => {
      createUser(req.user.sub, req.body.picture, req.body.email, req.body.name)
        .then( user => res.status(200).send(user) );
  });

  app.post('/event', jwtAuth,
    (req, res) => {
      createEvent(req.body.constraints, req.body.userId)
        .then(event => res.status(200).send(event))
        .catch(error => console.log(error));
  });

  app.get('/event', jwtAuth,
    (req, res) => {
      getEvent(req.query.eventId)
        .then(event => res.status(200).send(event))
        .catch(error => console.log(error));
  })

  app.get('/events', jwtAuth
    (req, res) => {
      getEvents(req.query.userId)
        .then(user => {
          res.status(200).send(user.events)
        })
        .catch(error => console.log(error));
  });

  app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });
};
