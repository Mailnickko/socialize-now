const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const eventController = require('../controllers/eventController');

const jwt = require('express-jwt');
const io = require('../server');

let jwtAuth = jwt({secret: new Buffer(process.env.AUTH0_SECRET, 'base64')})

module.exports = function routes(app, express) {
  //Chat
  app.route('/message')
    .post(messageController.addMessage);

  app.route('/getmessage')
    .post(messageController.getMessage);

  app.post('/participants', jwtAuth,
    (req,res) => {
      userController.getParticipants(req.body)
        .then(participants => {
          res.status(200).json(participants)
        })
        .catch(err => console.log(err));
  });

  //User
  app.post('/user', jwtAuth,
    (req, res) => {
      userController.createUser(req.user.sub, req.body.picture, req.body.email, req.body.name)
        .then( user => res.status(200).send(user));
  });

  app.post('/userinfo', jwtAuth,
    (req, res) => {
      userController.findUser(req.user.sub)
        .then(user => {
          res.status(200).json(user[0]);
        })
        .catch(err => console.log(error));
    });

  //Events
  app.post('/deleteevent', jwtAuth,
    (req, res) => {
      eventController.deleteEvent(req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200);
        })
    });

  app.post('/event', jwtAuth,
    (req, res) => {
      eventController.createEvent(req.body, req.user.sub)
        .then(event => {
          res.status(200).send(event)
        })
        .catch(error => console.log(error));
  });

  app.post('/findevent', jwtAuth,
    (req, res) => {
      eventController.getEvent(req.body, req.user.sub)
        .then(event =>{
          res.status(200).json(event)
        })
        .catch(error => console.log(error));
  });

  app.post('/events', jwtAuth,
    (req, res) => {
      eventController.getEvents(req.user.sub)
        .then(events => {
          res.status(200).json(events);
        })
        .catch(error => console.log(error));
  });

  //Invite User
  app.post('/inviteUser', jwtAuth, (req, res) => {
    eventController.inviteUser(req.body._id, req.user.sub, req.body.inviteeEmail);
    res.status(200).send(`Invited ${req.body.inviteeEmail}`);
  });

  //Voting
  app.put('/startVote' , jwtAuth,
    (req, res) => {
      eventController.beginEventVote(req.body, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/endVote' , jwtAuth,
    (req, res) => {
      eventController.endEventVote(req.body.winningEvent, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/upvote', jwtAuth,
    (req, res) => {
      eventController.upVote(req.body.index, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/downvote', jwtAuth,
    (req, res) => {
      eventController.downVote(req.body.index, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  //Root
  app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });

  //Catchall
  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });

};
