'use strict';

var fs = require('fs');
var util = require('util');
var service = require('../service');

exports.get = function(req, res) {
  var typePath = `${defaultPath}/types/${req.params.project}.json`;

  service.existFile(typePath)
  .then(function() {
    return service.readFile(typePath)
  })
  .then(function(data) {
    res.send(200, data);
  })
  .catch(function(err) {
    res.status(404).send({ message: err && err.message || '' });
  })
};

exports.add = function(req, res) {
  var formData = req.body;
  formData.urls = [];
  var filePath = `${defaultPath}/types/${req.body.project}.json`;
  var isExist = fs.existsSync(filePath);

  function save(path, fileData) {
    service.saveFile(path, fileData)
    .then(function() {
      res.send(204);
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    });
  };

  if(isExist) {
    service.readFile(filePath)
    .then(function(types) {
      var isExitSame = types.filter(function(type) { return formData.host === type.host }).length;
      if(isExitSame) {
        res.send(400, {message: '已经存在这个环境'});
      } else {
        types.push(formData);
        save(filePath, types);
      }
    })
  } else {
    let typeData = [formData];
    save(filePath, typeData);
  }
};

exports.change = function(req, res) {
  var type = req.body.type;
  var api = req.body.api;
  var typePath = `${defaultPath}/types/${type.project}.json`;

  service.request('127.0.0.1:8000/api/envs/proxy', req.body)
    .then(function() {
      return service.readFile(typePath);
    })
    .then(function(raw) {
      raw.some(function(data) {
        if(data.host === type.host) {
          if (!data.urls) {
            data.urls = [api.url];
          } else {
            var existSame = data.urls.filter(function(url) { return url === api.url});
            if(existSame.length === 0) data.urls.push(api.url);
          }
        }
      });
      return raw;
    })
    .then(function(raw) {
      service.saveFile(`${defaultPath}/types/${type.project}.json`, raw)
      .then(function() {
        res.send(204);
      })
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
};
