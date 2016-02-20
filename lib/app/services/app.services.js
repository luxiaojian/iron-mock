import Dialog from './dialog';

angular.module('eleme.services', [])
  .factory('DialogService', ['$http', '$rootScope', '$controller', '$compile', '$q', '$templateRequest', ($http, $rootScope, $controller, $compile, $q, $templateRequest) => {
    return new Dialog({ $http, $rootScope, $controller, $compile, $q, $templateRequest });
  }])
