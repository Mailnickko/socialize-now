const { createUser, deleteUser } = require('../controllers/userController');
const { getMessage, addMessage } = require('../controllers/messageController');

module.exports = function routes(app, express) {
  app.route('/test')
    .post(createUser);

  app.route('/message')
    .get(getMessage)
    .post(addMessage);
}
