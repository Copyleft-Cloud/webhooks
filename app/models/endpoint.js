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
        token        : String,
        description  : String,
        device           : {
            device_name    : String,
            private_ip   : String,
            public_ip    : String
        },
        service           : {
            service_name  : String,
            service_token : String,
            service_url      : String
        }
    },

});

// methods ======================
// generating a random token
endpointSchema.methods.generateToken = function() {
    return randomstring.generate();
};

// create the model for endpoints and expose it to our app
module.exports = mongoose.model('Endpoint', endpointSchema);
