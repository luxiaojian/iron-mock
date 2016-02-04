
'use strict';

var fs = require('fs');
var util = require('util');
var Util = require('./../Util');
var service = require('../service');
exports.add = function(req, res) {
  var name = req.body.name;

  service.saveFile(`${defaultPath}/projects/${name}.json`, JSON.stringify([]))
    .then(function() {
      res.send(200, { name: name });
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
};

exports.fetch = function(req, res) {
  service.reddirFiles(`${defaultPath}/projects`)
    .then(function(files) {

      function read(path, file) {
        return service.readFile(path)
          .then(function(data) {
            return {
              name: file.slice(0, -5),
              data: JSON.parse(data)
            };
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      var promises = files.map(function(file) {
        var target = `${defaultPath}/projects/${file}`;
        var isJSON = file.match(/^[^_].*\.json$/) !== null;
        return service.readStat(target)
          .then(function(stat){
            if(stat.isFile() && isJSON ) {
              return read(target, file);
            }
          })
          .catch(function(err) {
            res.status(400).send({ message: err && err.message || '' });
          })
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

exports.update = function(req, res) {
  var projectName = req.params.name;
  var apiName = req.body.name;

  function save(path, fileData) {
    return service.saveFile(path, fileData)
      .then(function() {
        res.send(204);
      })
      .catch(function(err) {
        res.status(400).send({ message: err && err.message || '' });
      });
  }

  service.readFile(`${defaultPath}/datas/${apiName}.json`)
    .then(function(api) {
      api = JSON.parse(api);
      delete api.name;
      service.readFile(`${defaultPath}/projects/${projectName}.json`)
        .then(function(routes) {
          routes = JSON.parse(routes);
          if(!Util.isArray(routes)) save(`${defaultPath}/projects/${projectName}.json`, JSON.stringify([api]));
          var isExitUrl = false;

          routes = routes.map(function(route) {
            if(route.url !== api.url) return route;
            isExitUrl = true;
            return api;
          });

          if(!isExitUrl) routes.push(api);
          save(`${defaultPath}/projects/${projectName}.json`, JSON.stringify(routes));
        })
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    });
};

exports.put = function(req, res) {
  var projectName = req.params.name;
  var api = req.body;

  function save(path, fileData) {
    return service.saveFile(path, fileData)
      .then(function() {
        res.send(204);
      })
      .catch(function(err) {
        res.status(400).send({ message: err && err.message || '' });
      });
  }

  service.readFile(`${defaultPath}/projects/${projectName}.json`)
    .then(function(routes) {
      routes = JSON.parse(routes);
      if(!Util.isArray(routes)) save(`${defaultPath}/projects/${projectName}.json`, JSON.stringify([api]));
      var isExitUrl = false;

      routes = routes.map(function(route) {
        if(route.url !== api.url) return route;
        isExitUrl = true;
        return api;
      });

      if(!isExitUrl) routes.push(api);
      save(`${defaultPath}/projects/${projectName}.json`, JSON.stringify(routes));
    })
};
exports.delete = function(req, res) {
  var projectName = req.params.name;
  var apiUrl = req.query.url;

  function save(path, fileData) {
    return service.saveFile(path, fileData)
      .then(function() {
        res.send(204);
      })
      .catch(function(err) {
        res.status(400).send({ message: err && err.message || '' });
      });
  }

  service.readFile(`${defaultPath}/projects/${projectName}.json`)
    .then(function(routes) {
      routes = JSON.parse(routes);
      routes.forEach(function(route, index) {
        if(route.url === apiUrl) routes.splice(index, 1);
      });
      save(`${defaultPath}/projects/${projectName}.json`, JSON.stringify(routes));
    })
};
