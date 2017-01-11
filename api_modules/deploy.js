// Deploy Module
const exec = require('child_process').exec;

function Deploy () {
  console.log('This is the Deploy Function');
};

Deploy.prototype.app = function () {
  console.log('This is the Deploy App Prototype Function');
};

module.exports = Deploy;
