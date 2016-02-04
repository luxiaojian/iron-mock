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

app.use(logger('[:date[iso]] :method :url :status :response-time ms'));
app.use(bodyParser());
app.use(cookieParser());
app.use(flash());


renderApi(app, `${defaultPath}/projects/`);


//监听端口
app.listen(8000);
console.log('mock server start at ' + 8000);
