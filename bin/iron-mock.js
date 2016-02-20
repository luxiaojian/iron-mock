#! /usr/bin/env node

var program = require('commander');
var nodemon = require('nodemon');
var pathUtil = require('path');
var open = require('child_process');
var log = console.log;

program
  .version(require('../package.json').version)
  .command('server')
  .alias('s')
  .description('mock server')
  .option('-p, --port <port>', '自定义端口')
  .action(function(options) {
    var port = options.port || 5000;
    var params = {
      port: port
    };

    var appFile = pathUtil.resolve(__dirname, '../lib/app.js');

    open.exec(`node ${appFile} --port ${params.port} --harmony`);
  })
  .on('--help', function() {
    log(' Examples:');
    log('');
    log('iron-mock server');
  });

//默认不传参显示帮助
if(!process.argv[2]) {
  program.help();
  log();
}

program.parse(process.argv);
