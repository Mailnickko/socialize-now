const express = require('express');
const app = express();
const path = require('path');
const { createUser, deleteUser } = require('./routes/routesHelper');
const middleware = require('./config/middleware')

middleware(app, express);

app.post('/test', (req, res) => {
  createUser(req.body.username, req.body.email)
    .then(res.status(200).send('Success'));
});

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server on port: ${port}/`);
});
