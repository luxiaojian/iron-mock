'use strict';

var fs = require('fs');
var service = require('../service');

exports.fetch = function(req, res) {
  service.reddirFiles('public/urls')
    .then(function(files) {

      function read(path, file) {
        return service.readFile(path)
          .then(function(data) {
            return {
              url: file.slice(0, -5).replace(/\-/g, '/'),
              data: JSON.parse(data)
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      var promises = files.map(function(file) {
        var target = `public/urls/${file}`;
        var isJSON = file.match(/^[^_].*\.json$/) !== null;
        return service.readStat(target)
          .then(function(stat){
            if(stat.isFile() && isJSON ) {
              return read(target, file);
            }
          })
          .catch(function(err) {
            res.status(400).send({ message: err && err.message || '' });
          });
      });

      Promise.all(promises).then(function(results) {
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

//exports.fetch = function(req, res) {
//  service.reddirFiles('./public/urls')
//    .then(function(files) {
//
//      function read(path, file) {
//        return service.readFile(path)
//          .then(function(data) {
//            return file.slice(0, -5).replace(/\-/g, '/')
//          })
//          .catch(function(err) {
//            console.log(err);
//          });
//      }
//
//      var promises = files.map(function(file) {
//        var target = `./public/urls/${file}`;
//        var isJSON = file.match(/^[^_].*\.json$/) !== null;
//        var stat = fs.statSync(target);
//
//        if(stat.isFile() && isJSON ) {
//          return read(target, file);
//        }
//      });
//
//      Promise.all(promises).then(function(results) {
//        res.send(200, results);
//      })
//      .catch(function(err) {
//        res.status(400).send({ message: err && err.message || '' });
//      })
//    })
//    .catch(function(err) {
//      res.status(400).send({ message: err && err.message || '' });
//    })
//};

exports.get = function(req, res) {
  var name = req.params.name;
  service.readFile(`public/urls/${name}.json`)
    .then(function(data) {
      res.send(200, JSON.parse(data));
    })
    .catch(function(err) {
      res.status(400).send({ message: err && err.message || '' });
    })
};
