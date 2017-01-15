// app/models/endpoint.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var randomstring = require('randomstring');

// define the schema for our user model
var endpointSchema = mongoose.Schema({

    endpoint         : {
        name         : String,
        type         : String,
        dns          : String,
        tokens       : {
          basestation: String,
          endpoint:    String
        }
    }

});

// methods ======================
// generating a random token
endpointSchema.methods.generateToken = function() {
    return randomstring.generate();
};

// create the model for endpoints and expose it to our app
module.exports = mongoose.model('Endpoint', endpointSchema);
