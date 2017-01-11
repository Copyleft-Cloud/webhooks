// IMPORT CORE NODE MODULES
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

// IMPORT CONFIGURATION
var config = require('./config/config.js');

// DECLARE APPLICATION
var app = express();

// IMPORT API MODULES
var Deploy = require('./api_modules/deploy.js');

// PASSPORT TOKEN AUTHENTICATION
passport.use(new Strategy(
  function(token, cb) {
    config.tokens.findByToken(token, function(err, service) {
      if (err) { return cb(err); }
      if (!service) { return cb(null, false); }
      return cb(null, service);
    });
  }));


// MIDDLEWARE
app.use(function (req, res, next) {
  console.log('This is the Middleware (start)');
  next();
});

app.use(function (req, res, next) {
  console.log('This is the Middleware (middle)');
  next();
});

app.use(function (req, res, next) {
  console.log('This is the Middleware (end)');
  next();
});


// ROUTES
app.get('/', function(req, res){
  res.send('Webhooks API by Copyleft.io');
});

app.get('/deploy/app', function(req, res){
  res.send('Webhooks API by Copyleft.io');
  var deploy = new Deploy();
  deploy.app();
});

// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:9999/?access_token=123456789
app.get('/status',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
  //res.json({ service: req.service.name, token: req.service.token });
  res.json('Webhooks API is listening on port 9999');
});

app.listen(9999, function () {
  console.log('Webhooks API listening on port 9999!')
})
