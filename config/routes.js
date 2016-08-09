const { createUser, deleteUser } = require('../controllers/userController');

module.exports = function routes(app, express) {
  app.post('/test', (req, res) => {
    createUser(req.body.username, req.body.email)
      .then(res.status(200).send('Success'));
  });
}
