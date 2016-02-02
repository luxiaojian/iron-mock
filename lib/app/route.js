
const routeConfig = [
  ['/', require('./index/index')],
  ['/apis/:name', require('./apiDetail/detail')],
  ['/urls/:name', require('./urlDetail/url')],
  ['/projects/:project/apis/:name', require('./projectDetail/project')]
];

const config =  /* @ngInject */function($routeProvider) {
  routeConfig.forEach(function (config) {
    $routeProvider.when(config[0], config[1]);
  });

  $routeProvider.otherwise({ redirectTo: '/404' });
};

module.exports = config;
