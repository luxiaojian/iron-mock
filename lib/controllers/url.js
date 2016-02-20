'use strict';

var fs = require('fs');
var util = require('util');
var service = require('../service');

exports.fetch = function(req, res) {
  service.reddirFiles(`${defaultPath}/urls`)
  .then(function(files) {
    var promises = files.map(function(file) {
      var target = `${defaultPath}/urls/${file}`;
      var isJSON = file.match(/^[^_].*\.json$/) !== null;
      return service.readStat(target)
      .then(function(stat){
        if(stat.isFile() && isJSON ) return service.readFile(target);
      })
      .then(function(raw) {
        return {
          url: file.slice(0, -5).replace(/\-/g, '/'),
          data: raw
        }
      })
      .catch(function(err) {
        res.status(400).send({ message: err && err.message || '' });
      });
    });

    Promise.all(promises).then(function(raws) {
      var results = raws.filter(function(raw){
        return util.isObject(raw);
      });
      res.send(200, results);
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  })
};

exports.get = function(req, res) {
  var name = req.params.name;

  service.readFile(`${defaultPath}/urls/${name}.json`)
  .then(function(data) {
    res.send(200, data);
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  })
};

exports.delete = function(req, res) {
  var urlName = req.params.name;

  service.deleteFile(`${defaultPath}/urls/-${urlName}.json`)
  .then(function() {
    res.send(204);
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  })
};
