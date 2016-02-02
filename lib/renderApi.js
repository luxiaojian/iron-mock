var fs = require('fs');
var util = require('util');

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

      if(stat.isFile() && (isJS || isJSON)) {
        var apis = require(target);
        if(!util.isArray(apis)) {
          apis = [apis];
        }

        apis.forEach(function(api) {
          app[api.method](api.url, function(req, res) {
            res.send(200, api.response);
          })
        })
      }
    });

  return app;
}

module.exports = renderApi;
