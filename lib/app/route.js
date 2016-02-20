import apiDetail from './apiDetail/detail';
import urlDetail from './urlDetail/url';
import projectDetail from './projectDetail/project';
import Home from './index/index';

const routeConfig = [
  ['/', Home],
  ['/apis/:name', apiDetail],
  ['/urls/:name', urlDetail],
  ['/projects/:project/apis/:name', projectDetail]
];

const config =  /* @ngInject */function($routeProvider) {
  routeConfig.forEach(function (config) {
    $routeProvider.when(config[0], config[1]);
  });

  $routeProvider.otherwise({ redirectTo: '/404' });
};

export default config;
