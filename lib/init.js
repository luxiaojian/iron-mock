var service = require('./service');
var fs = require('fs');

//初始化mockser的信息.
service.readFile(`${__dirname}/config.json`)
  .then(function(config){
    if(config.mockServer && config.mockServer.status) config.mockServer.status = false;
    return service.saveFile(`${__dirname}/config.json`, config)
  })
  .then(function() {
    console.log('初始化应用信息完成!');
  })
  .catch(function(err) {
    console.log(err && err.message || '')
  });

service.readFile(`${__dirname}/config.json`)
  .then(function(config) {
    global.defaultPath = config.defaultPath.replace('~', process.env.HOME);
    var floderExist = fs.existsSync(defaultPath);

    if(floderExist) throw new Error('.iron-mock数据文件夹已经存在,不要初始化!');
    return service.mkdir(defaultPath);
  })
  .then(function() {
    service.mkdir(`${defaultPath}/projects`);
    service.mkdir(`${defaultPath}/urls`);
    service.mkdir(`${defaultPath}/datas`);
    service.mkdir(`${defaultPath}/types`);
  }).then(function() {
    console.log('应用文件初始化完成!');
  })
  .catch(function(err) {
    console.log(err && err.message || '')
  });
