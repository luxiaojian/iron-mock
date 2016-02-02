angular.module('eleme.apis', [])
  .factory('apiService',/* @ngInject */($resource) => {
    return $resource('/restapi/apis/:name', {name : '@name'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .factory('urlService',/* @ngInject */($resource) => {
    return $resource('/restapi/urls/:name', {name : '@name'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .factory('projectService',/* @ngInject */($resource) => {
    return $resource('/restapi/projects/:name', {name : '@name'}, {
      update: {
        method: 'PUT'
      }
    });
  });
