import { createUser, deleteUser, findUser, getParticipants } from '../controllers/userController';
import { getMessage, addMessage } = from '../controllers/messageController';
import { createEvent, getEvent, inviteUser, beginEventVote, getEvents, sendEventVote, upVote, downVote, deleteEvent } from '../controllers/eventController';

const jwt = require('express-jwt');
const io = require('../server');

let jwtAuth = jwt({secret: new Buffer(process.env.AUTH0_SECRET, 'base64')})

module.exports = function routes(app, express) {
  //Chat
  app.route('/message')
    .post(addMessage);

  app.route('/getmessage')
    .post(getMessage);

  app.post('/participants', jwtAuth,
    (req,res) => {
      getParticipants(req.body)
        .then(participants => {
          res.status(200).json(participants)
        })
        .catch(err => console.log(err));
  });

  //User
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

  //Events
  app.post('/deleteevent', jwtAuth,
    (req, res) => {
      deleteEvent(req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200);
        })
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
  });

  app.post('/events', jwtAuth,
    (req, res) => {
      getEvents(req.user.sub)
        .then(events => {
          res.status(200).json(events);
        })
        .catch(error => console.log(error));
  });

  //Invite User
  app.post('/inviteUser', jwtAuth, (req, res) => {
    inviteUser(req.body._id, req.user.sub, req.body.inviteeEmail);
    res.status(200).send(`Invited ${req.body.inviteeEmail}`);
  });

  //Voting
  app.put('/startVote' , jwtAuth,
    (req, res) => {
      beginEventVote(req.body, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/endVote' , jwtAuth,
    (req, res) => {
      endEventVote(req.body.winningEvent, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/upvote', jwtAuth,
    (req, res) => {
      upVote(req.body.index, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  app.put('/downvote', jwtAuth,
    (req, res) => {
      downVote(req.body.index, req.body.eventId, req.user.sub)
        .then(event => {
          res.status(200).json(event);
          io.io.sockets.emit('updateVoteStatus');
        })
        .catch(error => console.log(error));
  });

  //Catchall
  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });
};
