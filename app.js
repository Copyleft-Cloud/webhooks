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
var PagerDuty = require('./api_modules/pagerduty.js');

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

// hubot example
// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:9999/status
app.get('/status',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
  //res.json({ service: req.service.name, token: req.service.token });
  res.json('Status: Webhooks API is listening on port 9999');
});

// hubot example
// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:9999/alert
app.get('/alert',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    var pd = new PagerDuty();
    pd.createEvent();
  //res.json({ service: req.service.name, token: req.service.token });
  res.json('PagerDuty Alert Created');
});

app.listen(9999, function () {
  console.log('Webhooks API listening on port 9999!')
})
