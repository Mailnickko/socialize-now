const express = require('express');
const app = express();
const path = require('path');
const helpers = require('./routes/routesHelper');

var port = process.env.PORT || 3001;

require('./config/middleware')(app, express);

app.listen(port, () => {
  console.log(`Server on port: ${port}/`);
});