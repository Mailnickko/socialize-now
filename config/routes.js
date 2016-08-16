const { createUser, deleteUser, findUser, getParticipants } = require('../controllers/userController');
const { getMessage, addMessage } = require('../controllers/messageController');

const { createEvent, getEvent, getEvents, inviteUser, beginEventVote, endEventVote } = require ('../controllers/eventController');

const jwt = require('express-jwt');
const secrets = require('./secrets');
const io = require('../server');

let jwtAuth = jwt({secret: new Buffer(secrets.jwtSecret || process.env.AUTH0_SECRET, 'base64')})

module.exports = function routes(app, express) {
  app.route('/message')
    .post(addMessage);

  app.route('/getmessage')
    .post(getMessage);

  app.post('/user', jwtAuth,
    (req, res) => {
      createUser(req.user.sub, req.body.picture, req.body.email, req.body.name)
        .then( user => res.status(200).send(user));
  });

  app.post('/userinfo', jwtAuth,
    (req, res) => {
      findUser(req.user.sub)
        .then(user => {
          res.status(200).json(user[0]);
        })
        .catch(err => console.log(error));
    });

  app.post('/participants', jwtAuth,
    (req,res) => {
      getParticipants(req.body)
        .then(participants => {
          res.status(200).json(participants)
        })
        .catch(err => console.log(err));
    });

  app.post('/event', jwtAuth,
    (req, res) => {
      createEvent(req.body, req.user.sub)
        .then(event => res.status(200).send(event))
        .catch(error => console.log(error));
  });

  app.post('/findevent', jwtAuth,
    (req, res) => {
      getEvent(req.body, req.user.sub)
        .then(event =>{
          res.status(200).json(event)
        })
        .catch(error => console.log(error));
  })

  app.put('/startVote' , jwtAuth,
    (req, res) => {
      beginEventVote(req.body)
        .then(event => {
          res.status(200).json(event)
        })
        .then(io.io.sockets.emit('updateVoteStatus'))
        .catch(error => console.log(error));
  })

  app.put('/endVote' , jwtAuth,
    (req, res) => {
      endEventVote(req.body.winningEvent, req.body.eventId)
        .then(event => {
          res.status(200).json(event)
        })
        .then(io.io.sockets.emit('updateVoteStatus'))
        .catch(error => console.log(error));
  })

  app.post('/events', jwtAuth,
    (req, res) => {
      getEvents(req.user.sub)
        .then(events => {
          res.status(200).json(events)
        })
        .catch(error => console.log(error));
  });

  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });

  app.post('/inviteUser', jwtAuth, (req, res) => {
    inviteUser(req.body._id, req.user.sub, req.body.inviteeEmail);
    res.status(200).send(`Invited ${req.body.inviteeEmail}`);
  });
};
