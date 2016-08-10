const { createUser, deleteUser } = require('../controllers/userController');
const { getMessage, addMessage } = require('../controllers/messageController');
const { createEvent, getEvent, getEvents } = require ('../controllers/eventController');

module.exports = function routes(app, express) {
  app.route('/message')
    .get(getMessage)
    .post(addMessage);

  app.post('/test', (req, res) => {
    createUser(req.body.username, req.body.email)
      .then(res.status(200).send('Success'));
  });

  app.post('/event', (req, res) => {
    createEvent(req.body.constraints, req.body.userId)
      .then(event => res.status(200).send(event))
      .catch(error => console.log(error));
  });

  app.get('/event', (req, res) => {
    getEvent(req.query.eventId)
      .then(event => res.status(200).send(event))
      .catch(error => console.log(error));
  })

  app.get('/events', (req, res) => {
    getEvents(req.query.userId)
      .then(user => {
        res.status(200).send(user.events)
      })
      .catch(error => console.log(error));
  });
};
