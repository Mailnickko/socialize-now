const express = require('express');
const app = express();
const path = require('path');

app.set('port', (process.env.API_PORT || 3001));
require('./config/middleware')(app, express);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
