var fs = require('fs');

exports.saveFile = function(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, data, function(err) {
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.readFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, data) {
      if(err) reject(err);
      else resolve(data);
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

