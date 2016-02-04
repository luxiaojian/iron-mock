'use strict';

var fs = require('fs');
var util = require('util');
var service = require('../service');

exports.add = function(req, res) {
  var name = req.body.name;
  var url = req.body.url.replace(/\//g, '-');
  var formData = req.body;
  var isUrlFile = fs.existsSync(`${defaultPath}/urls/${url}.json`);

  function save(filename, fileData) {
    fs.writeFileSync(`${defaultPath}/datas/${filename}.json`, JSON.stringify(fileData));
    service.readFile(`${defaultPath}/datas/${filename}.json`)
      .then(function(data) {
        res.send(200, JSON.parse(data));
      })
      .catch(function(err) {
        res.status(400).send({ message: err && err.message || '' });
      })
  };

  if(isUrlFile) {
    service.readFile(`${defaultPath}/urls/${url}.json`)
      .then(function(data) {
        let urlData = JSON.parse(data);
        urlData.push(formData);
        fs.writeFileSync(`${defaultPath}/urls/${url}.json`, JSON.stringify(urlData));
        save(name, formData);
      })
  } else {
    let urlData = [formData];
    fs.writeFileSync(`${defaultPath}/urls/${url}.json`, JSON.stringify(urlData));
    save(name, formData);
  }
};

exports.fetch = function(req, res) {
  service.reddirFiles(`${defaultPath}/datas`)
    .then(function(files) {
      function read(path) {
        return service.readFile(path)
          .then(function(data) {
            return JSON.parse(data);
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      var promises = files.map(function(file) {
        var target = `${defaultPath}/datas/${file}`;
        var isJSON = file.match(/^[^_].*\.json$/) !== null;
        return service.readStat(target)
          .then(function(stat){
            if(stat.isFile() && isJSON ) {
              return read(target);
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

exports.get = function(req, res) {
  var name = req.params.name;
  service.readFile(`${defaultPath}/datas/${name}.json`)
    .then(function(data) {
      res.send(200, JSON.parse(data));
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
};

exports.update = function(req, res) {
  var name = req.params.name;
  var data = req.body;

  service.readFile(`${defaultPath}/datas/${name}.json`)
    .then(function(api) {
      var _api = Object.assign(JSON.parse(api), data);
      service.saveFile(`${defaultPath}/datas/${name}.json`, JSON.stringify(_api))
        .then(function() {
          res.send(204);
        })
        .catch(function(err) {
          res.status(400).send({ message: err && err.message || '' });
        })
    })
};

exports.delete = function(req, res) {
  var name = req.params.name;
  service.deleteFile(`${defaultPath}/datas/${name}.json`)
    .then(function() {
      res.send(204);
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
};
