var fs = require('fs');
var service = require('./service');
var util = require('util');
var vhost = require('vhost');
var express = require('express');

var regexp = {
    expression: /{{(.*?)}}/g,
    split: /\s*\|\s*/,
    json: /^[^_].*\.json$/,
    js: /.+\.js$/
};

function renderApi(app, path) {
  fs.readdirSync(path)
    .forEach(function(file) {
      var target = `${path}/${file}`;
      var stat = fs.statSync(target);
      var isJSON = file.match(regexp.json) !== null;
      var isJS = file.match(regexp.js) !== null;
      var project = file.slice(0, -5);
      var server = express();

      server.use(function(req, res, next){
        console.log(req.vhost.hostname);
        next();
      });

      if(stat.isFile() && (isJS || isJSON)) {
        service.readFile(target)
        .then(function(project) {
          var apis = project.apis;
          if(!apis || apis.length <= 0) return;

          apis.forEach(function(api) {
            server[api.method](api.url, function(req, res) {
              res.send(200, api.response);
            })
          })

          app.use(vhost(project.hostname, server));
        })
      }
    });

  return app;
}

module.exports = renderApi;
