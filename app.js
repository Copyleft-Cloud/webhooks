var express = require('express');
var app = express();

var Deploy = require('./api_modules/deploy.js');


// MIDDLEWARE
app.use(function (req, res, next) {
  console.log('This is the Middleware');
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

app.listen(3000, function () {
  console.log('Webhooks API listening on port 3000!')
})


//http://localhost:3000/api/v1/alert/pagerduty?token=ABCDEFG1234567&s=web-prewards-portal&e=corp-prod
