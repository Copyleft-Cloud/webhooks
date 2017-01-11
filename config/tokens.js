var services = [
    { id: 1, name: 'hubot', token: '123456789' },
    { id: 2, name: 'travis', token: 'abcdefghi' },
    { id: 3, name: 'github', token: '987654321' }
];

exports.findByToken = function(token, cb) {
  process.nextTick(function() {
    for (var i = 0, len = services.length; i < len; i++) {
      var service = services[i];
      if (service.token === token) {
        return cb(null, service);
      }
      else {
        return cb(null, null);
      }
    }
  });
}
