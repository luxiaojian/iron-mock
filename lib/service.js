var fs = require('fs');
var ajax = require('superagent');

exports.existFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.exists(path, function(exist) {
      if(!exist) reject(new Error('not exist this file!'));
      else resolve();
    })
  })
};

exports.saveFile = function(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, JSON.stringify(data), function(err) {
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.readFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, data) {
      if(err) reject(err);
      else resolve(JSON.parse(data));
    })
  })
};

exports.reddirFiles = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, files) {
      if(err) reject(err);
      else resolve(files);
    })
  })
};

exports.deleteFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.unlink(path, function(err){
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.readStat = function(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(err, stats){
      if(err) reject(err);
      else resolve(stats);
    })
  })
};

exports.mkdir = function(path) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, function(err){
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.request = function(url, data) {
  return new Promise(function(resolve, reject) {
    ajax.post(url).send(data)
    .end(function(err, res) {
      if(err || !res.ok) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
