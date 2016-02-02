var fs = require('fs');

exports.saveFile = function(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`${__dirname}/${path}`, data, function(err) {
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.readFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(`${__dirname}/${path}`, function(err, data) {
      if(err) reject(err);
      else resolve(data);
    })
  })
};

exports.reddirFiles = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(`${__dirname}/${path}`, function(err, files) {
      if(err) reject(err);
      else resolve(files);
    })
  })
};

exports.deleteFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.unlink(`${__dirname}/${path}`, function(err){
      if(err) reject(err);
      else resolve();
    })
  })
};

exports.readStat = function(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(`${__dirname}/${path}`, function(err, stats){
      if(err) reject(err);
      else resolve(stats);
    })
  })
};
