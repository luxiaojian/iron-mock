require('./css/style.css');

require('./services/app.services');
require('./components/app.directives');
require('./api');

angular.module('eleme', [
    'ngRoute',
    'ngResource',
    'ie8provider',
    'ui.bootstrap',
    'ng.jsoneditor',
    'eleme.services',
    'eleme.directives',
    'eleme.apis'
  ])
  .config(/* @ngInject */function($routeProvider, $locationProvider, $provide, ie8Provider, $httpProvider) {
    // 修复 IE 中 Event:input 的 bug
    // reference: https://github.com/angular/angular.js/blob/v1.3.x/src/ng/sniffer.js
    $provide.decorator('$sniffer', ['$delegate', function ($sniffer) {
      // documentMode 是 IE 独有方法
      // reference: https://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
      var msie = Number(document.documentMode),
        divElm = document.createElement('div'),
        eventSupport = {};

      $sniffer.hasEvent = function (event) {
        if (event === 'input' && msie <= 11) return false;

        if (angular.isUndefined(eventSupport[event])) {
          eventSupport[event] = ('on' + event) in divElm;
        }

        return eventSupport[event];
      };
      return $sniffer;
    }]);

    //对admin路径权限做限制，设置http拦截器
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        'responseError': function(response) {
          if (response.status === 400 || response.status === 403) {
            $location.url('/');
          }
          return $q.reject(response);
        }
      }
    });

  })
  .config(require('./route'))
  .run(/* ngInject */function($rootScope, $http){
     $rootScope.open = function() {
       $http.get('/restapi/start')
         .then(() => {
           swal({
             title: 'mock server 在8000端口启动!',
             type: 'success',
             confirmButtonText: '知道了!'
           })
         })
         .catch((e) => {
            swal({
              title: '启动mock server出错了!',
              text: e.data.msg,
              type: 'error',
              confirmButtonText: '在试一次'
            })
         })
     }
  });

