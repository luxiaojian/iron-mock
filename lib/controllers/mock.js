var nodemon = require('nodemon');
var path = require('path');
var service = require('../service');

var initInfo = {
  mockServer:{
    port :8000,
    status :false
  }
};

service.saveFile('public/application.json', JSON.stringify(initInfo))
  .then(function() {
    console.log('初始化应用信息完成!');
  })
  .catch(function(err) {
    console.log(err && err.message || '')
  });

exports.run = function(req, res) {

  function runServer() {
    nodemon({
      script: `${__dirname}/../server.js`,
      nodeArgs: ['--harmony'],
      watch: `${__dirname}/../public/projects/`,
      ext: 'json, js'
    }).on('restart', function (files) {
      files.forEach(function (file) {
        var date = new Date();
        console.log('%s:%s:%s.%s - reload %s', date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), file);
      });
    });
  }
  var file = 'public/application.json';

  service.readFile(file)
    .then(function(info) {
      info = JSON.parse(info);
      if(info && info.mockServer.status) return res.send(409, {msg: 'Mock Server已经启动在8000端口,不需要重复启动!'});
      info.mockServer.status = true;
      service.saveFile(file, JSON.stringify(info))
        .then(function() {
          runServer();
          res.send(204);
        });
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    });
}
