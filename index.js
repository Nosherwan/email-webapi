/* Main app file.
 Contains mostly initialisation of modules in the app */

/* global module, exports:true */

'use strict';

// Set Default node environment (development||production)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const http = require('http');
const config = require('./lib/Config/config');
const configExpress = require('./lib/Config/express');

//init app
const app = express();

//config express
configExpress(app, express, config.siteSecret);

//load the routes module and wire at the same time
require('./lib/routes')(app);

(function InitializeServer(app) {
  const server = http.createServer(app);
  server.listen(config.port, '0.0.0.0', () => {
    console.log("Express server listening on port " + config.port);
  });
})(app);

//expose app to other modules
exports = module.exports = app;
