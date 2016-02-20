
'use strict';

var fs = require('fs');
var util = require('util');
var Util = require('./../Util');
var service = require('../service');

exports.add = function(req, res) {
  var name = req.body.name;
  var project = {
    hostname: req.body.hostname,
    apis: []
  };

  service.saveFile(`${defaultPath}/projects/${name}.json`, project)
  .then(function() {
    res.send(200, { name: name });
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  })
};

exports.fetch = function(req, res) {
  var projectsPath = `${defaultPath}/projects`;

  service.reddirFiles(projectsPath)
  .then(function(files) {
    var promises = files.map(function(file) {
      var target = `${defaultPath}/projects/${file}`;
      var isJSON = file.match(/^[^_].*\.json$/) !== null;

      return service.readStat(target)
      .then(function(stat){
        if(stat.isFile() && isJSON ) {
          return service.readFile(target)
          .then(function(raw) {
            return {
              name: file.slice(0, -5),
              data: raw
            };
          })
        }
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
  var apiPath = `${defaultPath}/datas/${req.body.name}.json`;
  var projectPath = `${defaultPath}/projects/${req.params.name}.json`;

  service.readFile(apiPath)
  .then(function(api) {
    delete api.name;
    return service.readFile(projectPath)
    .then(function(project) {
      if(project.apis.length > 0)  {
         var isExist = project.apis.filter(function(route) { return route.url === api.url; });
         if(isExist.length === 0) project.apis.push(api);
      } else {
        project.apis = [].concat(api);
      }

      return service.saveFile(projectPath, project);
    })
  })
  .then(function() {
    res.send(204);
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  });
};

exports.put = function(req, res) {
  var projectName = req.params.name;
  var projectInType = `${defaultPath}/types/${projectName}.json`;
  var projectInProject = `${defaultPath}/projects/${projectName}.json`;

  var api = req.body;

  service.readFile(projectInProject)
  .then(function(project) {
    if(project.apis.length > 0)  {
      project.apis = project.apis.map(function(route) {
        if(route.url !== api.url) return route;
        return api;
      });
    } else {
      project.apis = [].concat(api);
    }
    return service.saveFile(projectInProject, project);
  })
  .then(function() {
    return service.readFile(projectInType)
    .then(function(raw) {
      if(raw.length <= 0) return;
      raw.forEach(function(type) {
        type.urls.some(function(url, index) {
          if(url === api.url) type.urls.splice(index, 1);
        })
      });
      return service.saveFile(projectInType, raw);
    })
  })
  .then(function() {
    service.request('127.0.0.1:8000/api/envs/local', api)
    .then(function() {
      res.send(204);
    })
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  });
};

exports.delete = function(req, res) {
  var projectName = req.params.name;
  var apiUrl = req.query.url;
  var projectPath = `${defaultPath}/projects/${projectName}.json`;

  service.readFile(projectPath)
  .then(function(project) {
    project.apis.forEach(function(route, index) {
      if(route.url === apiUrl) project.apis.splice(index, 1);
    });

    return service.saveFile(projectPath, project)
  })
  .then(function() {
    res.send(204);
  })
  .catch(function(err) {
    res.status(400).send({ message: err && err.message || '' });
  });
};
