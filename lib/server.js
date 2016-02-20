var express = require('express');
var path = require('path');
var session = require('express-session'); //express的session中间件
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //session需要cookie-parser中间件
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var renderApi = require('./renderApi');
var app = express();
var config = require('./config.json');
var defaultPath = config.defaultPath.replace('~', process.env.HOME);
var proxy = require('express-http-proxy');
var removeRoute = require('express-remove-route');

app.use(logger('[:date[iso]] :method :url :status :response-time ms'));
app.use(bodyParser());
app.use(cookieParser());
app.use(flash());

app.post('/api/envs/proxy', function(request, response) {
  var data = request.body;

  removeRoute(app, data.api.url);
  app[data.api.method](data.api.url, proxy(data.type.host, {
    forwardPath: function(req, res) {
      return require('url').parse(req.url).path;
    }
  }));
  response.send(204);
});

app.post('/api/envs/local', function(request, response) {
  var api = request.body;

  removeRoute(app, api.url);
  app[api.method](api.url, function(req, res) {
    res.send(200, api.response);
  });
  response.send(204);
});

renderApi(app, `${defaultPath}/projects/`);

//监听端口
app.listen(8000);
console.log('mock server start at ' + 8000);
