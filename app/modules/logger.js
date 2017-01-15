// Logger Module
module.exports = function(req, res, next) {
  var start = +new Date();
  var stream = process.stdout;
  var url = req.url;
  var method = req.method;

  res.on('finish', function(){
    var duration = +new Date() - start;
    var message = method + ' ' + url + ' [' + duration + ' ms] \n\n';

    // Print the Log Message to STDOUT
    stream.write(message);
  });

  next();

};
