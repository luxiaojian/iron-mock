var express = require('express');
var path = require('path');
var session = require('express-session'); //express的session中间件
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //session需要cookie-parser中间件
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();
var open = require('child_process');
var route= require('./route');
var argv = process.argv;


app.use(logger('[:date[iso]] :method :url :status :response-time ms'));
app.use(bodyParser());
app.use(cookieParser());
app.use(flash());

require('./init');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', route);

app.get('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname + '/public' });
});

var params = {
  port: ''
};

for(var i = 2; i < argv.length; i++) {
  var arr = argv[i].split(' ');
  for(var key in params) {
    if(arr[0] == '--' + key) {
      params[key] = arr[1];
      break;
    }
  }
}

//监听端口
app.listen(5000);
console.log('site start at: 5000' );
open.exec(`open http://127.0.0.1:5000`);

