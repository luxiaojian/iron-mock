/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(14);
	
	angular.module('eleme', ['ngRoute', 'ngResource', 'ie8provider', 'ui.bootstrap', 'ng.jsoneditor', 'eleme.services', 'eleme.directives', 'eleme.apis']).config( /* @ngInject */["$routeProvider", "$locationProvider", "$provide", "ie8Provider", "$httpProvider", function ($routeProvider, $locationProvider, $provide, ie8Provider, $httpProvider) {
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
	        eventSupport[event] = 'on' + event in divElm;
	      }
	
	      return eventSupport[event];
	    };
	    return $sniffer;
	  }]);
	
	  //对admin路径权限做限制，设置http拦截器
	  $httpProvider.interceptors.push(["$q", "$location", function ($q, $location) {
	    return {
	      'responseError': function responseError(response) {
	        if (response.status === 400 || response.status === 403) {
	          $location.url('/');
	        }
	        return $q.reject(response);
	      }
	    };
	  }]);
	}]).config(__webpack_require__(15)).run( /* ngInject */["$rootScope", "$http", function ($rootScope, $http) {
	  $rootScope.open = function () {
	    $http.get('/restapi/start').then(function () {
	      swal({
	        title: 'mock server 在8000端口启动!',
	        type: 'success',
	        confirmButtonText: '知道了!'
	      });
	    })['catch'](function (e) {
	      swal({
	        title: '启动mock server出错了!',
	        text: e.data.msg,
	        type: 'error',
	        confirmButtonText: '在试一次'
	      });
	    });
	  };
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Dialog = __webpack_require__(6);
	
	angular.module('eleme.services', []).factory('DialogService', ['$http', '$rootScope', '$controller', '$compile', '$q', '$templateRequest', function ($http, $rootScope, $controller, $compile, $q, $templateRequest) {
	  return new Dialog({ $http: $http, $rootScope: $rootScope, $controller: $controller, $compile: $compile, $q: $q, $templateRequest: $templateRequest });
	}]);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Dialog = (function () {
	  function Dialog(services) {
	    _classCallCheck(this, Dialog);
	
	    this.services = services;
	  }
	
	  _createClass(Dialog, [{
	    key: 'init',
	    value: function init(_ref) {
	      var controller = _ref.controller;
	      var controllerAs = _ref.controllerAs;
	      var scope = _ref.scope;
	      var $controller = this.services.$controller;
	
	      var ctrl = $controller(controller, { scope: scope });
	
	      var dialog = {
	        controller: ctrl,
	        scope: scope,
	        element: this.element,
	        hide: this.hide.bind(this)
	      };
	
	      ctrl.$dialog = dialog;
	      if (controllerAs) scope[controllerAs] = ctrl;
	
	      return dialog;
	    }
	  }, {
	    key: 'show',
	    value: function show(_ref2) {
	      var _this = this;
	
	      var parentElement = _ref2.parentElement;
	      var template = _ref2.template;
	      var templateUrl = _ref2.templateUrl;
	      var controller = _ref2.controller;
	      var controllerAs = _ref2.controllerAs;
	      var _services = this.services;
	      var $compile = _services.$compile;
	      var $rootScope = _services.$rootScope;
	
	      var scope = $rootScope.$new();
	
	      return this.fetchTemplate({ template: template, templateUrl: templateUrl }).then(function (raw) {
	        var linkFn = $compile(raw);
	        var element = linkFn(scope);
	
	        if (parentElement) {
	          _this.parentElement = parentElement;
	          parentElement.appendChild(element[0]);
	        } else {
	          document.body.appendChild(element[0]);
	        }
	
	        _this.element = element;
	      }).then(function () {
	        return _this.init({ controller: controller, controllerAs: controllerAs, scope: scope });
	      });
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      if (this.parentElement) {
	        this.parentElement.removeChild(this.element[0]);
	      } else {
	        document.body.removeChild(this.element[0]);
	      }
	    }
	  }, {
	    key: 'fetchTemplate',
	    value: function fetchTemplate(_ref3) {
	      var template = _ref3.template;
	      var templateUrl = _ref3.templateUrl;
	      var _services2 = this.services;
	      var $q = _services2.$q;
	      var $templateRequest = _services2.$templateRequest;
	
	      var deferred = $q.defer();
	
	      if (template) {
	        deferred.resolve(template);
	      } else if (templateUrl) {
	        $templateRequest(templateUrl).then(deferred.resolve);
	      } else {
	        deferred.reject('No specify template or templateUrl');
	      }
	
	      return deferred.promise;
	    }
	  }]);
	
	  return Dialog;
	})();
	
	exports['default'] = Dialog;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var aside = __webpack_require__(8);
	
	angular.module('eleme.directives', []).directive('elemeAside', aside);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	
	var modalTemplate = __webpack_require__(11);
	var projectTemplate = __webpack_require__(12);
	var template = __webpack_require__(13);
	
	function /* @ngInject */aside(DialogService, apiService, urlService, projectService, $location, $rootScope, $http) {
	  return {
	    restrict: 'AE',
	    scope: {},
	    templateUrl: template,
	    link: function link($scope) {
	      $scope.queryApi = function () {
	        $rootScope.type = 'api';
	        apiService.query({}).$promise.then(function (apis) {
	          $scope.apis = apis;
	        });
	      };
	      $scope.queryApi();
	      $scope.queryUrl = function () {
	        $rootScope.type = 'url';
	        urlService.query({}).$promise.then(function (data) {
	          $scope.urls = data;
	        });
	      };
	
	      $scope.queryProject = function () {
	        $rootScope.type = 'project';
	        projectService.query({}).$promise.then(function (data) {
	          $scope.projects = data;
	        });
	      };
	
	      $scope.addApi = function () {
	        DialogService.show({
	          templateUrl: modalTemplate,
	          controller: function controller() {
	            var _this = this;
	
	            this.hide = function () {
	              _this.$dialog.hide();
	            };
	
	            this.submit = function () {
	              apiService.save(JSON.stringify(_this.api)).$promise.then(function (data) {
	                $scope.apis.unshift(data);
	                _this.$dialog.hide();
	              });
	            };
	          },
	          controllerAs: 'modal'
	        });
	      };
	
	      $scope.addProject = function () {
	        DialogService.show({
	          templateUrl: projectTemplate,
	          controller: function controller() {
	            var _this2 = this;
	
	            this.hide = function () {
	              _this2.$dialog.hide();
	            };
	
	            this.projects = [];
	
	            this.submit = function () {
	              projectService.save(JSON.stringify({ name: _this2.name })).$promise.then(function (data) {
	                $scope.projects.unshift(data);
	
	                _this2.$dialog.hide();
	              });
	            };
	          },
	          controllerAs: 'project'
	        });
	      };
	
	      $scope.goApi = function (api) {
	        localStorage.setItem('apiItem', JSON.stringify(api));
	        $rootScope.type = 'api';
	        $location.url('/apis/' + api.name);
	      };
	
	      $scope.goProjectApi = function (name, api) {
	        localStorage.setItem('projectApiItem', JSON.stringify(api));
	        var urlName = api.url.replace(/\//, '').replace(/\//g, '-');
	        $rootScope.type = 'project';
	        $location.url('/projects/' + name + '/apis/' + urlName);
	      };
	
	      $scope.goUrl = function (data) {
	        var urlName = data.url.replace(/\//, '').replace(/\//g, '-');
	        localStorage.setItem('urlItem', JSON.stringify(data));
	        $rootScope.type = 'url';
	        $location.url('/urls/' + urlName);
	      };
	
	      $scope.deleteApi = function (api, index) {
	        apiService.remove({ name: api.name }).$promise.then(function () {
	          $scope.apis.splice(index, 1);
	        });
	      };
	
	      $scope.deleteUrl = function (url, index) {
	        var urlName = url.replace(/\//, '').replace(/\//g, '-');
	        urlService.remove({ name: urlName }).$promise.then(function () {
	          $scope.urls.splice(index, 1);
	        });
	      };
	
	      $scope.deleteProjectApi = function (parent, index) {
	        var project = $scope.projects[parent];
	        var api = project.data[index];
	        $http['delete']('/restapi/projects/' + project.name + '?url=' + api.url).success(function () {
	          project.data.splice(index, 1);
	          $rootScope.type = 'project';
	          $location.url('/');
	        }).error(function (e) {
	          swal({
	            title: '出错了!',
	            type: 'error',
	            confirmButtonText: '知道了!'
	          });
	        });
	      };
	    }
	  };
	}
	
	module.exports = aside;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	var path = '/app/components/modal/modal.html';
	var html = "<div class=\"modal in\" role=\"dialog\" style=\"display: block; padding-right: 15px; background-color: rgba(0, 0, 0, .5)\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title\">新api</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form class=\"form-horizontal\" novalidate>\n          <div class=\"form-group\">\n            <label for=\"apiName\" class=\"col-sm-2 control-label\">Name</label>\n            <div class=\"col-sm-10\">\n              <input id=\"apiName\" type=\"text\" ng-model=\"modal.api.name\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n            <div class=\"col-sm-10\">\n              <input id=\"url\" type=\"text\" ng-model=\"modal.api.url\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n            <div class=\"col-sm-10\">\n              <select id=\"method\" ng-model=\"modal.api.method\" class=\"form-control\">\n                <option value=\"get\">GET</option>\n                <option value=\"post\">POST</option>\n                <option value=\"put\">PUT</option>\n                <option value=\"delete\">DELETE</option>\n                <option value=\"patch\">PATCH</option>\n              </select>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" ng-click=\"modal.hide()\" class=\"btn btn-default\">取消</button>\n        <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"modal.submit()\">创建api</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var path = '/app/components/modal/projectModal.html';
	var html = "<div class=\"modal in\" role=\"dialog\" style=\"display: block; padding-right: 15px; background-color: rgba(0, 0, 0, .5)\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title\">添加新项目</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form class=\"form-horizontal\" novalidate>\n          <div class=\"form-group\">\n            <label for=\"name\" class=\"col-sm-2 control-label\">项目名:</label>\n            <div class=\"col-sm-10\">\n              <input id=\"name\" type=\"text\" ng-model=\"project.name\" class=\"form-control\">\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" ng-click=\"project.hide()\" class=\"btn btn-default\">取消</button>\n        <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"project.submit()\">创建项目</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var path = '/app/components/aside/aside.html';
	var html = "<aside>\n  <ul class=\"nav nav-tabs\" ng-init=\"queryApi()\">\n    <li ng-class=\"{'active': $root.type === 'api'}\"><a href=\"Javascript:;\" ng-click=\"queryApi()\">api列表</a></li>\n    <li ng-class=\"{'active': $root.type === 'url'}\"><a href=\"Javascript:;\" ng-click=\"queryUrl()\">接口列表</a></li>\n    <li ng-class=\"{'active': $root.type === 'project'}\"><a href=\"Javascript:;\" ng-click=\"queryProject()\">项目列表</a></li>\n  </ul>\n\n  <div class=\"tab-content\">\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'api'}\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item clearfix\" ng-repeat=\"api in apis\">\n          <span ng-bind=\"api.name\" class=\"pull-left\" ng-click=\"goApi(api)\"></span>\n          <a href = \"Javascript:;\" class = \"btn btn-danger pull-right btn-sm\" ng-click=\"deleteApi(api, $index)\">删除</a>\n        </li>\n      </ul>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addApi()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n\n    <div class=\"tab-pane url-content\" ng-class=\"{'active': $root.type === 'url'}\">\n      <ul class=\"link-list\">\n        <li class=\"clearfix url-item\" ng-repeat=\"data in urls\">\n          <span class=\"text-primary text-link pull-left\" ng-bind=\"data.url\" ng-click=\"goUrl(data)\"></span>\n          <a href = \"Javascript:;\" class = \"glyphicon glyphicon-trash pull-right text-danger\" ng-click=\"deleteUrl(data.url, $index)\" style=\"margin-top: 8px;\"></a>\n        </li>\n      </ul>\n    </div>\n\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'project'}\">\n      <uib-accordion>\n        <uib-accordion-group is-open=\"open\" ng-repeat=\"project in projects\">\n          <uib-accordion-heading>\n            <i class=\"glyphicon\" ng-class=\"{'glyphicon-folder-open': open, 'glyphicon-folder-close': !open}\"></i>\n            <span ng-bind=\"project.name\"></span>\n            <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open, 'glyphicon-chevron-right': !open}\"></i>\n          </uib-accordion-heading>\n          <div ng-if=\"project.data.length <= 0\" class=\"text-center\">\n            <p>该项目还没有添加路由赶紧去添加吧!</p>\n            <a ng-click=\"queryUrl()\" class = \"btn btn-danger\">去添加接口</a>\n          </div>\n          <ul class=\"link-list\" ng-if=\"project.data.length > 0\">\n            <li ng-repeat=\"api in project.data track by $index\" class=\"clearfix\">\n              <span class=\"text-primary text-link pull-left\" ng-bind=\"api.url\" ng-click=\"goProjectApi(project.name, api)\"></span>\n              <a href = \"Javascript:;\" class = \"glyphicon glyphicon-trash pull-right text-danger\" ng-click=\"deleteProjectApi($parent.$index, $index)\" style=\"margin-top: 8px;\"></a>\n            </li>\n          </ul>\n        </uib-accordion-group>\n      </uib-accordion>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addProject()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n  </div>\n</aside>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	angular.module('eleme.apis', []).factory('apiService', /* @ngInject */function ($resource) {
	  return $resource('/restapi/apis/:name', { name: '@name' }, {
	    update: {
	      method: 'PUT'
	    }
	  });
	}).factory('urlService', /* @ngInject */function ($resource) {
	  return $resource('/restapi/urls/:name', { name: '@name' }, {
	    update: {
	      method: 'PUT'
	    }
	  });
	}).factory('projectService', /* @ngInject */function ($resource) {
	  return $resource('/restapi/projects/:name', { name: '@name' }, {
	    update: {
	      method: 'PUT'
	    }
	  });
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var routeConfig = [['/', __webpack_require__(16)], ['/apis/:name', __webpack_require__(18)], ['/urls/:name', __webpack_require__(20)], ['/projects/:project/apis/:name', __webpack_require__(24)]];
	
	var config = /* @ngInject */["$routeProvider", function ($routeProvider) {
	  routeConfig.forEach(function (config) {
	    $routeProvider.when(config[0], config[1]);
	  });
	
	  $routeProvider.otherwise({ redirectTo: '/404' });
	}];
	
	module.exports = config;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(17);
	
	var orderCtrl = (function () {
	  function orderCtrl() {
	    _classCallCheck(this, orderCtrl);
	  }
	
	  _createClass(orderCtrl, null, [{
	    key: '$inject',
	    get: function get() {
	      return ['$scope'];
	    }
	  }]);
	
	  return orderCtrl;
	})();
	
	module.exports = {
	  templateUrl: '/app/index/index.html',
	  controller: orderCtrl,
	  controllerAs: 'vm'
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/app/index/index.html';
	var html = "<p>这里是首页</p>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(19);
	
	var apiItemCtrl = (function () {
	  _createClass(apiItemCtrl, null, [{
	    key: '$inject',
	    get: function get() {
	      return ['apiService', '$location', '$scope'];
	    }
	  }]);
	
	  function apiItemCtrl(apiService, $location, $scope) {
	    _classCallCheck(this, apiItemCtrl);
	
	    this.services = { apiService: apiService, $location: $location, $scope: $scope };
	    this.api = JSON.parse(localStorage.getItem('apiItem'));
	    this.jsonMode = { mode: 'tree' };
	  }
	
	  _createClass(apiItemCtrl, [{
	    key: 'submit',
	    value: function submit() {
	      var _services = this.services;
	      var apiService = _services.apiService;
	      var $location = _services.$location;
	      var $scope = _services.$scope;
	
	      var data = angular.copy(this.api);
	
	      apiService.save({ name: this.api.name }, data).$promise.then(function () {
	        swal({
	          title: '数据保存成功',
	          text: '接口更新成功!赶紧重启mock server吧!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        }, function (isConfirm) {
	          $location.url('/');
	          $scope.$apply();
	        });
	      });
	    }
	  }, {
	    key: 'setModeCode',
	    value: function setModeCode() {
	      this.jsonMode.mode = 'code';
	    }
	  }, {
	    key: 'setModeTree',
	    value: function setModeTree() {
	      this.jsonMode.mode = 'tree';
	    }
	  }]);
	
	  return apiItemCtrl;
	})();
	
	module.exports = {
	  templateUrl: '/app/apiDetail/detail.html',
	  controller: apiItemCtrl,
	  controllerAs: 'vm'
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var path = '/app/apiDetail/detail.html';
	var html = "<div class=\"panel panel-default\" ng-init=\"vm.getApi()\">\n  <div class=\"panel-heading\">\n    <h1 class=\"panel-title text-center\" ng-bind=\"'接口名称' + vm.api.name\" ng-if=\"vm.api.name\"></h1>\n  </div>\n  <form class=\"form-horizontal\" novalidate>\n    <div class=\"panel-body\">\n      <div class=\"form-group\">\n        <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n        <div class=\"col-sm-10\">\n          <input id=\"url\" type=\"text\" ng-model=\"vm.api.url\" class=\"form-control\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n        <div class=\"col-sm-10\">\n          <select id=\"method\" ng-model=\"vm.api.method\" class=\"form-control\">\n            <option value=\"get\">GET</option>\n            <option value=\"post\">POST</option>\n            <option value=\"put\">PUT</option>\n            <option value=\"delete\">DELETE</option>\n            <option value=\"patch\">PATCH</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for = \"response\" class = \"col-sm-2 control-label\">Response:</label>\n        <div class=\"col-sm-10\">\n          <div ng-jsoneditor ng-model=\"vm.api.response\" name = 'jsonEditor' options=\"vm.jsonMode\" style=\"width: 100%; height: 300px;\" prefix-text=\"true\"></div>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeCode()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'tree'\">response切换code模式</a>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeTree()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'code'\">response切换tree模式</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"panel-footer\">\n      <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.submit()\">保存</button>\n    </div>\n  </form>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(21);
	__webpack_require__(22);
	
	var urlItemCtrl = (function () {
	  _createClass(urlItemCtrl, null, [{
	    key: '$inject',
	    get: function get() {
	      return ['projectService', '$routeParams'];
	    }
	  }]);
	
	  function urlItemCtrl(projectService, $routeParams) {
	    _classCallCheck(this, urlItemCtrl);
	
	    this.services = { projectService: projectService, $routeParams: $routeParams };
	    var urlItem = JSON.parse(localStorage.getItem('urlItem'));
	    this.apis = urlItem.data;
	    this.postData = {
	      url: urlItem.url,
	      project: null,
	      api: null
	    };
	  }
	
	  _createClass(urlItemCtrl, [{
	    key: 'choose',
	    value: function choose(api) {
	      this.postData.api = api;
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var projectService = this.services.projectService;
	
	      projectService.save({ name: this.postData.project }, JSON.stringify(this.postData.api)).$promise.then(function () {
	        swal({
	          title: '数据保存成功',
	          text: '接口更新成功!赶紧重启mock server吧!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        });
	      })['catch'](function (e) {
	        swal({
	          title: '出错了!',
	          type: 'error',
	          confirmButtonText: '知道了!'
	        });
	      });
	    }
	  }, {
	    key: 'fetchProjects',
	    value: function fetchProjects() {
	      var _this = this;
	
	      var projectService = this.services.projectService;
	
	      projectService.query({}).$promise.then(function (data) {
	        _this.projects = data;
	      });
	    }
	  }]);
	
	  return urlItemCtrl;
	})();
	
	module.exports = {
	  templateUrl: '/app/urlDetail/url.html',
	  controller: urlItemCtrl,
	  controllerAs: 'vm'
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var path = '/app/urlDetail/url.html';
	var html = "<div class=\"panel panel-default\">\n  <div class=\"panel-body form-horizontal\">\n    <div class=\"form-group\">\n      <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n      <div class=\"col-sm-10\">\n        <input id=\"url\" type=\"text\" ng-model=\"vm.postData.url\" class=\"form-control\">\n      </div>\n    </div>\n\n    <div class=\"form-group\" ng-init=\"vm.fetchProjects()\">\n      <label for=\"method\" class=\"col-sm-2 control-label\">Project:</label>\n      <div class=\"col-sm-10\">\n        <select id=\"method\" ng-model=\"vm.postData.project\" class=\"form-control\">\n          <option value=\"{{ project.name }}\" ng-repeat=\"project in vm.projects\" ng-bind=\"project.name\"></option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">API:</label>\n      <div class=\"col-sm-10\">\n        <button class=\"btn btn-info\" ng-class=\"{'active': api === vm.postData.api }\" ng-repeat=\"api in vm.apis\" ng-bind=\"api.name\" ng-click=\"vm.choose(api)\"></button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel-footer\">\n    <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.submit()\">保存数据</button>\n  </div>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(25);
	
	var projectCtrl = (function () {
	  _createClass(projectCtrl, null, [{
	    key: '$inject',
	
	    //注入顺序和初始化顺序
	    get: function get() {
	      return ['projectService', '$location', '$routeParams', '$rootScope', '$http'];
	    }
	  }]);
	
	  function projectCtrl(projectService, $location, $routeParams, $rootScope, $http) {
	    _classCallCheck(this, projectCtrl);
	
	    this.services = { $location: $location, projectService: projectService, $rootScope: $rootScope, $http: $http };
	    this.name = $routeParams.project;
	    this.api = JSON.parse(localStorage.getItem('projectApiItem'));
	    this.jsonMode = { mode: 'tree' };
	  }
	
	  _createClass(projectCtrl, [{
	    key: 'submit',
	    value: function submit() {
	      var projectService = this.services.projectService;
	
	      projectService.update({ name: this.name }, JSON.stringify(this.api)).$promise.then(function () {
	        swal({
	          title: '数据保存成功',
	          text: '接口更新成功!赶紧重启mock server吧!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        });
	      })['catch'](function (e) {
	        swal({
	          title: '出错了!',
	          type: 'error',
	          confirmButtonText: '知道了!'
	        });
	      });
	    }
	  }, {
	    key: 'setModeCode',
	    value: function setModeCode() {
	      this.jsonMode.mode = 'code';
	    }
	  }, {
	    key: 'setModeTree',
	    value: function setModeTree() {
	      this.jsonMode.mode = 'tree';
	    }
	  }]);
	
	  return projectCtrl;
	})();
	
	module.exports = {
	  templateUrl: '/app/projectDetail/project.html',
	  controller: projectCtrl,
	  controllerAs: 'vm'
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var path = '/app/projectDetail/project.html';
	var html = "<div class=\"panel panel-default\" ng-init=\"vm.getApi()\">\n  <div class=\"panel-heading\">\n    <h1 class=\"panel-title text-center\" ng-bind=\"'项目名称:' + vm.name\" ng-if=\"vm.name\"></h1>\n  </div>\n  <form class=\"form-horizontal\" novalidate>\n    <div class=\"panel-body\">\n      <div class=\"form-group\">\n        <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n        <div class=\"col-sm-10\">\n          <input id=\"url\" type=\"text\" ng-model=\"vm.api.url\" class=\"form-control\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n        <div class=\"col-sm-10\">\n          <select id=\"method\" ng-model=\"vm.api.method\" class=\"form-control\">\n            <option value=\"get\">GET</option>\n            <option value=\"post\">POST</option>\n            <option value=\"put\">PUT</option>\n            <option value=\"delete\">DELETE</option>\n            <option value=\"patch\">PATCH</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for = \"response\" class = \"col-sm-2 control-label\">Response:</label>\n        <div class=\"col-sm-10\">\n          <div ng-jsoneditor ng-model=\"vm.api.response\" options=\"vm.jsonMode\" style=\"width: 100%; height: 300px;\" prefix-text=\"true\"></div>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeCode()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'tree'\">response切换code模式</a>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeTree()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'code'\">response切换tree模式</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"panel-footer\">\n      <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.submit()\">更新</button>\n    </div>\n  </form>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGI2MDBiMTBjNmYwNDMwYWMyNjciLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY3NzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvYXBwLnNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL21vZGFsL21vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvbW9kYWwvcHJvamVjdE1vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvYXBpLmpzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4L2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwaURldGFpbC9kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwaURldGFpbC9kZXRhaWwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvdXJsRGV0YWlsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdXJsRGV0YWlsL3VybC5odG1sIiwid2VicGFjazovLy8uL2FwcC91cmxEZXRhaWwvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3Byb2plY3REZXRhaWwvcHJvamVjdC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0Esb0JBQU8sQ0FBQyxDQUFpQixDQUFDLENBQUM7O0FBRTNCLG9CQUFPLENBQUMsQ0FBeUIsQ0FBQyxDQUFDO0FBQ25DLG9CQUFPLENBQUMsQ0FBNkIsQ0FBQyxDQUFDO0FBQ3ZDLG9CQUFPLENBQUMsRUFBTyxDQUFDLENBQUM7O0FBRWpCLFFBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQ3BCLFNBQVMsRUFDVCxZQUFZLEVBQ1osYUFBYSxFQUNiLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixZQUFZLENBQ2IsQ0FBQyxDQUNELE1BQU0saUJBQWdCLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBUyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUU7OztBQUczTCxXQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLFFBQVEsRUFBRTs7O0FBRy9ELFNBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1NBQ3RDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztTQUN0QyxZQUFZLEdBQUcsRUFBRSxDQUFDOztBQUVwQixhQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQ25DLFdBQUksS0FBSyxLQUFLLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLE9BQU8sS0FBSyxDQUFDOztBQUVsRCxXQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUMscUJBQVksQ0FBQyxLQUFLLENBQUMsR0FBSSxJQUFJLEdBQUcsS0FBSyxJQUFLLE1BQU0sQ0FBQztRQUNoRDs7QUFFRCxjQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUM1QixDQUFDO0FBQ0YsWUFBTyxRQUFRLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7OztBQUdKLGdCQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBUyxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzFFLFlBQU87QUFDTCxzQkFBZSxFQUFFLHVCQUFTLFFBQVEsRUFBRTtBQUNsQyxhQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO0FBQ3RELG9CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ3BCO0FBQ0QsZ0JBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QjtNQUNGO0lBQ0YsQ0FBQyxDQUFDLENBQUM7RUFFTCxDQUFDLENBQUMsQ0FDRixNQUFNLENBQUMsbUJBQU8sQ0FBQyxFQUFTLENBQUMsQ0FBQyxDQUMxQixHQUFHLGdCQUFlLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxVQUFTLFVBQVUsRUFBRSxLQUFLLEVBQUM7QUFDbkUsYUFBVSxDQUFDLElBQUksR0FBRyxZQUFXO0FBQzNCLFVBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFlBQU07QUFDVixXQUFJLENBQUM7QUFDSCxjQUFLLEVBQUUsd0JBQXdCO0FBQy9CLGFBQUksRUFBRSxTQUFTO0FBQ2YsMEJBQWlCLEVBQUUsTUFBTTtRQUMxQixDQUFDO01BQ0gsQ0FBQyxTQUNJLENBQUMsVUFBQyxDQUFDLEVBQUs7QUFDWCxXQUFJLENBQUM7QUFDSCxjQUFLLEVBQUUsbUJBQW1CO0FBQzFCLGFBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDaEIsYUFBSSxFQUFFLE9BQU87QUFDYiwwQkFBaUIsRUFBRSxNQUFNO1FBQzFCLENBQUM7TUFDSixDQUFDO0lBQ0w7RUFDSCxDQUFDLENBQUMsQzs7Ozs7O0FDdkVMLDBDOzs7Ozs7Ozs7OztBQ0FBLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBVSxDQUFDLENBQUM7O0FBRWpDLFFBQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQ2pDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsRUFBSztBQUN6SyxVQUFPLElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxVQUFVLEVBQVYsVUFBVSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxFQUFFLEVBQUYsRUFBRSxFQUFFLGdCQUFnQixFQUFoQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7RUFDdkYsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7S0NMQyxNQUFNO0FBQ0MsWUFEUCxNQUFNLENBQ0UsUUFBUSxFQUFFOzJCQURsQixNQUFNOztBQUVSLFNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCOztnQkFIRyxNQUFNOztZQUtOLGNBQUMsSUFBaUMsRUFBRTtXQUFsQyxVQUFVLEdBQVgsSUFBaUMsQ0FBaEMsVUFBVTtXQUFFLFlBQVksR0FBekIsSUFBaUMsQ0FBcEIsWUFBWTtXQUFFLEtBQUssR0FBaEMsSUFBaUMsQ0FBTixLQUFLO1dBQzdCLFdBQVcsR0FBSyxJQUFJLENBQUMsUUFBUSxDQUE3QixXQUFXOztBQUNqQixXQUFJLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDLENBQUM7O0FBRTlDLFdBQUksTUFBTSxHQUFHO0FBQ1gsbUJBQVUsRUFBRSxJQUFJO0FBQ2hCLGNBQUssRUFBTCxLQUFLO0FBQ0wsZ0JBQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUNyQixhQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUM7O0FBRUYsV0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdEIsV0FBSSxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFN0MsY0FBTyxNQUFNLENBQUM7TUFDZjs7O1lBRUcsY0FBQyxLQUFrRSxFQUFFOzs7V0FBbEUsYUFBYSxHQUFmLEtBQWtFLENBQWhFLGFBQWE7V0FBRSxRQUFRLEdBQXpCLEtBQWtFLENBQWpELFFBQVE7V0FBRSxXQUFXLEdBQXRDLEtBQWtFLENBQXZDLFdBQVc7V0FBRSxVQUFVLEdBQWxELEtBQWtFLENBQTFCLFVBQVU7V0FBRSxZQUFZLEdBQWhFLEtBQWtFLENBQWQsWUFBWTt1QkFDcEMsSUFBSSxDQUFDLFFBQVE7V0FBdEMsUUFBUSxhQUFSLFFBQVE7V0FBRSxVQUFVLGFBQVYsVUFBVTs7QUFDMUIsV0FBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOztBQUU5QixjQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsQ0FBQyxDQUNqRCxJQUFJLENBQUMsYUFBRyxFQUFJO0FBQ1gsYUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLGFBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFNUIsYUFBSSxhQUFhLEVBQUU7QUFDakIsaUJBQUssYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNuQyx3QkFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUN2QyxNQUFNO0FBQ0wsbUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ3ZDOztBQUVELGVBQUssT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QixDQUFDLENBQ0QsSUFBSSxDQUFDO2dCQUFNLE1BQUssSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFWLFVBQVUsRUFBRSxZQUFZLEVBQVosWUFBWSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQztRQUFBLENBQUMsQ0FBQztNQUMvRDs7O1lBRUcsZ0JBQUc7QUFDTCxXQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDdEIsYUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU07QUFDTCxpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDO01BQ0Y7OztZQUVZLHVCQUFDLEtBQXVCLEVBQUU7V0FBeEIsUUFBUSxHQUFULEtBQXVCLENBQXRCLFFBQVE7V0FBRSxXQUFXLEdBQXRCLEtBQXVCLENBQVosV0FBVzt3QkFDSCxJQUFJLENBQUMsUUFBUTtXQUF0QyxFQUFFLGNBQUYsRUFBRTtXQUFFLGdCQUFnQixjQUFoQixnQkFBZ0I7O0FBQzFCLFdBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFMUIsV0FBSSxRQUFRLEVBQUU7QUFDWixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksV0FBVyxFQUFFO0FBQ3RCLHlCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsTUFBTTtBQUNMLGlCQUFRLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDdkQ7O0FBRUQsY0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO01BQ3pCOzs7VUFoRUcsTUFBTTs7O3NCQW1FRyxNQUFNOzs7Ozs7Ozs7QUNuRXJCLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBZSxDQUFDLENBQUM7O0FBRXJDLFFBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQ25DLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEM7Ozs7Ozs7O0FDSGpDLG9CQUFPLENBQUMsQ0FBYSxDQUFDLENBQUM7O0FBRXZCLEtBQUksYUFBYSxHQUFHLG1CQUFPLENBQUMsRUFBdUIsQ0FBQyxDQUFDO0FBQ3JELEtBQUksZUFBZSxHQUFHLG1CQUFPLENBQUMsRUFBOEIsQ0FBQyxDQUFDO0FBQzlELEtBQUksUUFBUSxHQUFHLG1CQUFPLENBQUMsRUFBYyxDQUFDLENBQUM7O0FBRXZDLHlCQUF3QixLQUFLLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0FBQ2pILFVBQU87QUFDTCxhQUFRLEVBQUUsSUFBSTtBQUNkLFVBQUssRUFBQyxFQUVMO0FBQ0QsZ0JBQVcsRUFBRSxRQUFRO0FBQ3JCLFNBQUksRUFBRSxjQUFDLE1BQU0sRUFBSztBQUNoQixhQUFNLENBQUMsUUFBUSxHQUFHLFlBQVc7QUFDM0IsbUJBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLG1CQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUNqQixRQUFRLENBQ1IsSUFBSSxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ25CLGlCQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztVQUNwQixDQUFDLENBQUM7UUFDTixDQUFDO0FBQ0YsYUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xCLGFBQU0sQ0FBQyxRQUFRLEdBQUcsWUFBVztBQUMzQixtQkFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDeEIsbUJBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQ2pCLFFBQVEsQ0FDUixJQUFJLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDbkIsaUJBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1VBQ3BCLENBQUMsQ0FBQztRQUNOLENBQUM7O0FBRUYsYUFBTSxDQUFDLFlBQVksR0FBRyxZQUFXO0FBQy9CLG1CQUFVLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUM1Qix1QkFBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDckIsUUFBUSxDQUNSLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUNoQixpQkFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7VUFDeEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQzs7QUFFRixhQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDekIsc0JBQWEsQ0FBQyxJQUFJLENBQUM7QUFDakIsc0JBQVcsRUFBRSxhQUFhO0FBQzFCLHFCQUFVLEVBQUUsc0JBQVc7OztBQUNyQixpQkFBSSxDQUFDLElBQUksR0FBRyxZQUFNO0FBQ2hCLHFCQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztjQUNyQixDQUFDOztBQUVGLGlCQUFJLENBQUMsTUFBTSxHQUFHLFlBQU07QUFDbEIseUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFLLEdBQUcsQ0FBQyxDQUFDLENBQ3RDLFFBQVEsQ0FDUixJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDZCx1QkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsdUJBQUssT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixDQUFDO2NBQ0w7WUFDRjtBQUNELHVCQUFZLEVBQUUsT0FBTztVQUN0QixDQUFDO1FBQ0gsQ0FBQzs7QUFFRixhQUFNLENBQUMsVUFBVSxHQUFHLFlBQVc7QUFDN0Isc0JBQWEsQ0FBQyxJQUFJLENBQUM7QUFDakIsc0JBQVcsRUFBRSxlQUFlO0FBQzVCLHFCQUFVLEVBQUUsc0JBQVc7OztBQUNyQixpQkFBSSxDQUFDLElBQUksR0FBRyxZQUFNO0FBQ2hCLHNCQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztjQUNyQixDQUFDOztBQUVGLGlCQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsaUJBQUksQ0FBQyxNQUFNLEdBQUcsWUFBTTtBQUNsQiw2QkFBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQUssSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUNuRCxRQUFRLENBQ1IsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2QsdUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUU5Qix3QkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Y0FDTDtZQUNGO0FBQ0QsdUJBQVksRUFBRSxTQUFTO1VBQ3hCLENBQUM7UUFDSCxDQUFDOztBQUVGLGFBQU0sQ0FBQyxLQUFLLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDM0IscUJBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRCxtQkFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDeEIsa0JBQVMsQ0FBQyxHQUFHLFlBQVUsR0FBRyxDQUFDLElBQUksQ0FBRztRQUNuQyxDQUFDOztBQUVGLGFBQU0sQ0FBQyxZQUFZLEdBQUcsVUFBUyxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ3hDLHFCQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1RCxhQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1RCxtQkFBVSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDNUIsa0JBQVMsQ0FBQyxHQUFHLGdCQUFjLElBQUksY0FBUyxPQUFPLENBQUc7UUFDbkQsQ0FBQzs7QUFFRixhQUFNLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzVCLGFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdELHFCQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEQsbUJBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLGtCQUFTLENBQUMsR0FBRyxZQUFVLE9BQU8sQ0FBRyxDQUFDO1FBQ25DLENBQUM7O0FBRUYsYUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdEMsbUJBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBQyxDQUFDLENBQ2hDLFFBQVEsQ0FDUixJQUFJLENBQUMsWUFBVTtBQUNkLGlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDOUIsQ0FBQztRQUNMLENBQUM7O0FBRUYsYUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdEMsYUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4RCxtQkFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUMvQixRQUFRLENBQ1IsSUFBSSxDQUFDLFlBQVU7QUFDZCxpQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQzlCLENBQUM7UUFDTCxDQUFDOztBQUVGLGFBQU0sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDaEQsYUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxhQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLGNBQUssVUFBTyx3QkFBc0IsT0FBTyxDQUFDLElBQUksYUFBUSxHQUFHLENBQUMsR0FBRyxDQUFHLENBQzdELE9BQU8sQ0FBQyxZQUFNO0FBQ2Isa0JBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5QixxQkFBVSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDNUIsb0JBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDcEIsQ0FBQyxDQUNELEtBQUssQ0FBQyxVQUFDLENBQUMsRUFBSztBQUNaLGVBQUksQ0FBQztBQUNILGtCQUFLLEVBQUUsTUFBTTtBQUNiLGlCQUFJLEVBQUUsT0FBTztBQUNiLDhCQUFpQixFQUFFLE1BQU07WUFDMUIsQ0FBQztVQUNILENBQUM7UUFDTDtNQUVGO0lBQ0Y7RUFDRjs7QUFFRCxPQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQzs7Ozs7O0FDakp0QiwwQzs7Ozs7OztBQ0FBO0FBQ0EsNEVBQTJFLHFCQUFxQjtBQUNoRyxpRUFBZ0Usb0JBQW9CO0FBQ3BGLHVCOzs7Ozs7QUNIQTtBQUNBLDRFQUEyRSxxQkFBcUI7QUFDaEcsaUVBQWdFLG9CQUFvQjtBQUNwRix1Qjs7Ozs7O0FDSEE7QUFDQSxnR0FBK0YsK0JBQStCLHlCQUF5QiwrREFBK0QsK0JBQStCLHlCQUF5Qiw4REFBOEQsbUNBQW1DLHlCQUF5QixnSUFBZ0ksK0JBQStCLDZPQUE2Tyw4SkFBOEosMEtBQTBLLCtCQUErQiw4UEFBOFAsaUlBQWlJLDJGQUEyRixtQ0FBbUMsZ01BQWdNLCtEQUErRCx1SEFBdUgsaUVBQWlFLHdrQkFBd2tCLDhJQUE4SSwySUFBMkk7QUFDaDVGLGlFQUFnRSxvQkFBb0I7QUFDcEYsdUI7Ozs7Ozs7O0FDSEEsUUFBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQzdCLE9BQU8sQ0FBQyxZQUFZLGlCQUFnQixVQUFDLFNBQVMsRUFBSztBQUNsRCxVQUFPLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxFQUFDLElBQUksRUFBRyxPQUFPLEVBQUMsRUFBRTtBQUN4RCxXQUFNLEVBQUU7QUFDTixhQUFNLEVBQUUsS0FBSztNQUNkO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUNELE9BQU8sQ0FBQyxZQUFZLGlCQUFnQixVQUFDLFNBQVMsRUFBSztBQUNsRCxVQUFPLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxFQUFDLElBQUksRUFBRyxPQUFPLEVBQUMsRUFBRTtBQUN4RCxXQUFNLEVBQUU7QUFDTixhQUFNLEVBQUUsS0FBSztNQUNkO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUNELE9BQU8sQ0FBQyxnQkFBZ0IsaUJBQWdCLFVBQUMsU0FBUyxFQUFLO0FBQ3RELFVBQU8sU0FBUyxDQUFDLHlCQUF5QixFQUFFLEVBQUMsSUFBSSxFQUFHLE9BQU8sRUFBQyxFQUFFO0FBQzVELFdBQU0sRUFBRTtBQUNOLGFBQU0sRUFBRSxLQUFLO01BQ2Q7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLEM7Ozs7Ozs7O0FDcEJKLEtBQU0sV0FBVyxHQUFHLENBQ2xCLENBQUMsR0FBRyxFQUFFLG1CQUFPLENBQUMsRUFBZSxDQUFDLENBQUMsRUFDL0IsQ0FBQyxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxFQUFvQixDQUFDLENBQUMsRUFDOUMsQ0FBQyxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxFQUFpQixDQUFDLENBQUMsRUFDM0MsQ0FBQywrQkFBK0IsRUFBRSxtQkFBTyxDQUFDLEVBQXlCLENBQUMsQ0FBQyxDQUN0RSxDQUFDOztBQUVGLEtBQU0sTUFBTSxrQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLGNBQWMsRUFBRTtBQUN6RSxjQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQ3BDLG1CQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7O0FBRUgsaUJBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNsRCxDQUFDLENBQUM7O0FBRUgsT0FBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLEM7Ozs7Ozs7Ozs7OztBQ2hCdkIsb0JBQU8sQ0FBQyxFQUFjLENBQUMsQ0FBQzs7S0FFbEIsU0FBUztZQUFULFNBQVM7MkJBQVQsU0FBUzs7O2dCQUFULFNBQVM7O1VBQ0ssZUFBRztBQUNuQixjQUFPLENBQUUsUUFBUSxDQUFDLENBQUM7TUFDcEI7OztVQUhHLFNBQVM7OztBQU1mLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixjQUFXLEVBQUUsdUJBQXVCO0FBQ3BDLGFBQVUsRUFBRSxTQUFTO0FBQ3JCLGVBQVksRUFBRSxJQUFJO0VBQ25CLEM7Ozs7OztBQ1pEO0FBQ0E7QUFDQSxpRUFBZ0Usb0JBQW9CO0FBQ3BGLHVCOzs7Ozs7Ozs7Ozs7QUNIQSxvQkFBTyxDQUFDLEVBQWUsQ0FBQyxDQUFDOztLQUVuQixXQUFXO2dCQUFYLFdBQVc7O1VBQ0csZUFBRztBQUNuQixjQUFPLENBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztNQUMvQzs7O0FBRVUsWUFMUCxXQUFXLENBS0YsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUc7MkJBTHpDLFdBQVc7O0FBTWIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLFVBQVUsRUFBVixVQUFVLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUM7QUFDbEQsU0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN2RCxTQUFJLENBQUMsUUFBUSxHQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0lBQ2hDOztnQkFURyxXQUFXOztZQVdULGtCQUFHO3VCQUNpQyxJQUFJLENBQUMsUUFBUTtXQUEvQyxVQUFVLGFBQVYsVUFBVTtXQUFFLFNBQVMsYUFBVCxTQUFTO1dBQUUsTUFBTSxhQUFOLE1BQU07O0FBQ25DLFdBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxpQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxFQUFFLElBQUksQ0FBQyxDQUN6QyxRQUFRLENBQ1IsSUFBSSxDQUFDLFlBQU07QUFDVixhQUFJLENBQUM7QUFDSCxnQkFBSyxFQUFFLFFBQVE7QUFDZixlQUFJLEVBQUUsMEJBQTBCO0FBQ2hDLGVBQUksRUFBRSxTQUFTO0FBQ2YsNEJBQWlCLEVBQUUsTUFBTTtVQUMxQixFQUFFLFVBQUMsU0FBUyxFQUFLO0FBQ2hCLG9CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLGlCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7VUFDakIsQ0FBQyxDQUFDO1FBQ0osQ0FBQztNQUNMOzs7WUFFVSx1QkFBRztBQUNaLFdBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztNQUM3Qjs7O1lBRVUsdUJBQUc7QUFDWixXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7TUFDN0I7OztVQXBDRyxXQUFXOzs7QUF1Q2pCLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixjQUFXLEVBQUUsNEJBQTRCO0FBQ3pDLGFBQVUsRUFBRSxXQUFXO0FBQ3ZCLGVBQVksRUFBRSxJQUFJO0VBQ25CLEM7Ozs7OztBQzdDRDtBQUNBLGkyQ0FBZzJDLGVBQWUsK0hBQStILDhKQUE4SjtBQUM1b0QsaUVBQWdFLG9CQUFvQjtBQUNwRix1Qjs7Ozs7Ozs7Ozs7O0FDSEEsb0JBQU8sQ0FBQyxFQUFZLENBQUMsQ0FBQztBQUN0QixvQkFBTyxDQUFDLEVBQWEsQ0FBQyxDQUFDOztLQUVqQixXQUFXO2dCQUFYLFdBQVc7O1VBQ0csZUFBRztBQUNuQixjQUFPLENBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7TUFDNUM7OztBQUVVLFlBTFAsV0FBVyxDQUtILGNBQWMsRUFBRSxZQUFZLEVBQUU7MkJBTHRDLFdBQVc7O0FBTWIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLGNBQWMsRUFBZCxjQUFjLEVBQUUsWUFBWSxFQUFaLFlBQVksRUFBRSxDQUFDO0FBQ2pELFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQzFELFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN6QixTQUFJLENBQUMsUUFBUSxHQUFHO0FBQ2QsVUFBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO0FBQ2hCLGNBQU8sRUFBRSxJQUFJO0FBQ2IsVUFBRyxFQUFFLElBQUk7TUFDVjtJQUNGOztnQkFkRyxXQUFXOztZQWdCVCxnQkFBQyxHQUFHLEVBQUU7QUFDVixXQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7TUFDekI7OztZQUVLLGtCQUFHO1dBQ0QsY0FBYyxHQUFLLElBQUksQ0FBQyxRQUFRLENBQWhDLGNBQWM7O0FBRXBCLHFCQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2xGLFFBQVEsQ0FDUixJQUFJLENBQUMsWUFBTTtBQUNWLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsUUFBUTtBQUNmLGVBQUksRUFBRSwwQkFBMEI7QUFDaEMsZUFBSSxFQUFFLFNBQVM7QUFDZiw0QkFBaUIsRUFBRSxNQUFNO1VBQzFCLENBQUM7UUFDSCxDQUFDLFNBQ0ksQ0FBQyxVQUFDLENBQUMsRUFBSztBQUNaLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsTUFBTTtBQUNiLGVBQUksRUFBRSxPQUFPO0FBQ2IsNEJBQWlCLEVBQUUsTUFBTTtVQUMxQixDQUFDO1FBQ0gsQ0FBQztNQUNMOzs7WUFHWSx5QkFBRzs7O1dBQ1IsY0FBYyxHQUFLLElBQUksQ0FBQyxRQUFRLENBQWhDLGNBQWM7O0FBRXBCLHFCQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUNyQixRQUFRLENBQ1IsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2QsZUFBSyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztNQUNOOzs7VUFuREcsV0FBVzs7O0FBc0RqQixPQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2YsY0FBVyxFQUFFLHlCQUF5QjtBQUN0QyxhQUFVLEVBQUUsV0FBVztBQUN2QixlQUFZLEVBQUUsSUFBSTtFQUNuQixDOzs7Ozs7QUM3REQ7QUFDQSxxb0JBQW9vQixnQkFBZ0IsMlNBQTJTLG1DQUFtQztBQUNsK0IsaUVBQWdFLG9CQUFvQjtBQUNwRix1Qjs7Ozs7O0FDSEEsMEM7Ozs7Ozs7Ozs7Ozs7QUNBQSxvQkFBTyxDQUFDLEVBQWdCLENBQUMsQ0FBQzs7S0FFcEIsV0FBVztnQkFBWCxXQUFXOzs7O1VBR0csZUFBRztBQUNuQixjQUFPLENBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDaEY7OztBQUVVLFlBUFAsV0FBVyxDQU9GLGNBQWMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7MkJBUHJFLFdBQVc7O0FBUWIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsY0FBYyxFQUFkLGNBQWMsRUFBRSxVQUFVLEVBQVYsVUFBVSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUMsQ0FBQztBQUNoRSxTQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7QUFDakMsU0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzlELFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDaEM7O2dCQVpHLFdBQVc7O1lBY1Qsa0JBQUc7V0FDRCxjQUFjLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBaEMsY0FBYzs7QUFFcEIscUJBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUN4RSxJQUFJLENBQUMsWUFBTTtBQUNWLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsUUFBUTtBQUNmLGVBQUksRUFBRSwwQkFBMEI7QUFDaEMsZUFBSSxFQUFFLFNBQVM7QUFDZiw0QkFBaUIsRUFBRSxNQUFNO1VBQzFCLENBQUM7UUFDSCxDQUFDLFNBQ0ksQ0FBQyxVQUFDLENBQUMsRUFBSztBQUNaLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsTUFBTTtBQUNiLGVBQUksRUFBRSxPQUFPO0FBQ2IsNEJBQWlCLEVBQUUsTUFBTTtVQUMxQixDQUFDO1FBQ0gsQ0FBQztNQUNMOzs7WUFHVSx1QkFBRztBQUNaLFdBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztNQUM3Qjs7O1lBRVUsdUJBQUc7QUFDWixXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7TUFDN0I7OztVQTFDRyxXQUFXOzs7QUE2Q2pCLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixjQUFXLEVBQUUsaUNBQWlDO0FBQzlDLGFBQVUsRUFBRSxXQUFXO0FBQ3ZCLGVBQVksRUFBRSxJQUFJO0VBQ25CLEM7Ozs7OztBQ25ERDtBQUNBLHMwQ0FBcTBDLGVBQWUsK0hBQStILDhKQUE4SjtBQUNqbkQsaUVBQWdFLG9CQUFvQjtBQUNwRix1QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBiNjAwYjEwYzZmMDQzMGFjMjY3XG4gKiovIiwicmVxdWlyZSgnLi9jc3Mvc3R5bGUuY3NzJyk7XG5cbnJlcXVpcmUoJy4vc2VydmljZXMvYXBwLnNlcnZpY2VzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMnKTtcbnJlcXVpcmUoJy4vYXBpJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdlbGVtZScsIFtcbiAgICAnbmdSb3V0ZScsXG4gICAgJ25nUmVzb3VyY2UnLFxuICAgICdpZThwcm92aWRlcicsXG4gICAgJ3VpLmJvb3RzdHJhcCcsXG4gICAgJ25nLmpzb25lZGl0b3InLFxuICAgICdlbGVtZS5zZXJ2aWNlcycsXG4gICAgJ2VsZW1lLmRpcmVjdGl2ZXMnLFxuICAgICdlbGVtZS5hcGlzJ1xuICBdKVxuICAuY29uZmlnKC8qIEBuZ0luamVjdCAqL1tcIiRyb3V0ZVByb3ZpZGVyXCIsIFwiJGxvY2F0aW9uUHJvdmlkZXJcIiwgXCIkcHJvdmlkZVwiLCBcImllOFByb3ZpZGVyXCIsIFwiJGh0dHBQcm92aWRlclwiLCBmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRwcm92aWRlLCBpZThQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xuICAgIC8vIOS/ruWkjSBJRSDkuK0gRXZlbnQ6aW5wdXQg55qEIGJ1Z1xuICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci5qcy9ibG9iL3YxLjMueC9zcmMvbmcvc25pZmZlci5qc1xuICAgICRwcm92aWRlLmRlY29yYXRvcignJHNuaWZmZXInLCBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uICgkc25pZmZlcikge1xuICAgICAgLy8gZG9jdW1lbnRNb2RlIOaYryBJRSDni6zmnInmlrnms5VcbiAgICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9jYzE5Njk4OCh2PXZzLjg1KS5hc3B4XG4gICAgICB2YXIgbXNpZSA9IE51bWJlcihkb2N1bWVudC5kb2N1bWVudE1vZGUpLFxuICAgICAgICBkaXZFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgZXZlbnRTdXBwb3J0ID0ge307XG5cbiAgICAgICRzbmlmZmVyLmhhc0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCA9PT0gJ2lucHV0JyAmJiBtc2llIDw9IDExKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXZlbnRTdXBwb3J0W2V2ZW50XSkpIHtcbiAgICAgICAgICBldmVudFN1cHBvcnRbZXZlbnRdID0gKCdvbicgKyBldmVudCkgaW4gZGl2RWxtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50U3VwcG9ydFtldmVudF07XG4gICAgICB9O1xuICAgICAgcmV0dXJuICRzbmlmZmVyO1xuICAgIH1dKTtcblxuICAgIC8v5a+5YWRtaW7ot6/lvoTmnYPpmZDlgZrpmZDliLbvvIzorr7nva5odHRw5oum5oiq5ZmoXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXCIkcVwiLCBcIiRsb2NhdGlvblwiLCBmdW5jdGlvbigkcSwgJGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAncmVzcG9uc2VFcnJvcic6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pO1xuXG4gIH1dKVxuICAuY29uZmlnKHJlcXVpcmUoJy4vcm91dGUnKSlcbiAgLnJ1bigvKiBuZ0luamVjdCAqL1tcIiRyb290U2NvcGVcIiwgXCIkaHR0cFwiLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cCl7XG4gICAgICRyb290U2NvcGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICRodHRwLmdldCgnL3Jlc3RhcGkvc3RhcnQnKVxuICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICB0aXRsZTogJ21vY2sgc2VydmVyIOWcqDgwMDDnq6/lj6PlkK/liqghJyxcbiAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5ZCv5YqobW9jayBzZXJ2ZXLlh7rplJnkuoYhJyxcbiAgICAgICAgICAgICAgdGV4dDogZS5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICflnKjor5XkuIDmrKEnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgfVxuICB9XSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwcC5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jc3Mvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIERpYWxvZyA9IHJlcXVpcmUoJy4vZGlhbG9nJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdlbGVtZS5zZXJ2aWNlcycsIFtdKVxuICAuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIFsnJGh0dHAnLCAnJHJvb3RTY29wZScsICckY29udHJvbGxlcicsICckY29tcGlsZScsICckcScsICckdGVtcGxhdGVSZXF1ZXN0JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgJGNvbXBpbGUsICRxLCAkdGVtcGxhdGVSZXF1ZXN0KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBEaWFsb2coeyAkaHR0cCwgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsICRjb21waWxlLCAkcSwgJHRlbXBsYXRlUmVxdWVzdCB9KTtcbiAgfV0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9zZXJ2aWNlcy9hcHAuc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBEaWFsb2cge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlcykge1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgfVxuXG4gIGluaXQoe2NvbnRyb2xsZXIsIGNvbnRyb2xsZXJBcywgc2NvcGV9KSB7XG4gICAgdmFyIHsgJGNvbnRyb2xsZXIgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGN0cmwgPSAkY29udHJvbGxlcihjb250cm9sbGVyLCB7IHNjb3BlIH0pO1xuXG4gICAgdmFyIGRpYWxvZyA9IHtcbiAgICAgIGNvbnRyb2xsZXI6IGN0cmwsXG4gICAgICBzY29wZSxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgIGhpZGU6IHRoaXMuaGlkZS5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIGN0cmwuJGRpYWxvZyA9IGRpYWxvZztcbiAgICBpZiAoY29udHJvbGxlckFzKSBzY29wZVtjb250cm9sbGVyQXNdID0gY3RybDtcblxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cblxuICBzaG93KHsgcGFyZW50RWxlbWVudCwgdGVtcGxhdGUsIHRlbXBsYXRlVXJsLCBjb250cm9sbGVyLCBjb250cm9sbGVyQXMgfSkge1xuICAgIHZhciB7ICRjb21waWxlLCAkcm9vdFNjb3BlIH0gPSB0aGlzLnNlcnZpY2VzO1xuICAgIHZhciBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuXG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hUZW1wbGF0ZSh7IHRlbXBsYXRlLCB0ZW1wbGF0ZVVybCB9KVxuICAgICAgLnRoZW4ocmF3ID0+IHtcbiAgICAgICAgdmFyIGxpbmtGbiA9ICRjb21waWxlKHJhdyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbGlua0ZuKHNjb3BlKTtcblxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50WzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnRbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmluaXQoeyBjb250cm9sbGVyLCBjb250cm9sbGVyQXMsIHNjb3BlIH0pKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50WzBdKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaFRlbXBsYXRlKHt0ZW1wbGF0ZSwgdGVtcGxhdGVVcmx9KSB7XG4gICAgdmFyIHsgJHEsICR0ZW1wbGF0ZVJlcXVlc3QgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVVybCkge1xuICAgICAgJHRlbXBsYXRlUmVxdWVzdCh0ZW1wbGF0ZVVybCkudGhlbihkZWZlcnJlZC5yZXNvbHZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmZXJyZWQucmVqZWN0KCdObyBzcGVjaWZ5IHRlbXBsYXRlIG9yIHRlbXBsYXRlVXJsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvc2VydmljZXMvZGlhbG9nLmpzXG4gKiovIiwidmFyIGFzaWRlID0gcmVxdWlyZSgnLi9hc2lkZS9hc2lkZScpO1xuXG5hbmd1bGFyLm1vZHVsZSgnZWxlbWUuZGlyZWN0aXZlcycsIFtdKVxuICAuZGlyZWN0aXZlKCdlbGVtZUFzaWRlJywgYXNpZGUpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvY29tcG9uZW50cy9hcHAuZGlyZWN0aXZlcy5qc1xuICoqLyIsInJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbnZhciBtb2RhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9tb2RhbC9tb2RhbC5odG1sJyk7XG52YXIgcHJvamVjdFRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbCcpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9hc2lkZS5odG1sJyk7XG5cbmZ1bmN0aW9uIC8qIEBuZ0luamVjdCAqL2FzaWRlKERpYWxvZ1NlcnZpY2UsIGFwaVNlcnZpY2UsIHVybFNlcnZpY2UsIHByb2plY3RTZXJ2aWNlLCAkbG9jYXRpb24sICRyb290U2NvcGUsICRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgc2NvcGU6e1xuXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogdGVtcGxhdGUsXG4gICAgbGluazogKCRzY29wZSkgPT4ge1xuICAgICAgJHNjb3BlLnF1ZXJ5QXBpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdhcGknO1xuICAgICAgICBhcGlTZXJ2aWNlLnF1ZXJ5KHt9KVxuICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFwaXMpIHtcbiAgICAgICAgICAgICRzY29wZS5hcGlzID0gYXBpcztcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAkc2NvcGUucXVlcnlBcGkoKTtcbiAgICAgICRzY29wZS5xdWVyeVVybCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAndXJsJztcbiAgICAgICAgdXJsU2VydmljZS5xdWVyeSh7fSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUudXJscyA9IGRhdGE7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUucXVlcnlQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgcHJvamVjdFNlcnZpY2UucXVlcnkoe30pXG4gICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAkc2NvcGUucHJvamVjdHMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5hZGRBcGkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgRGlhbG9nU2VydmljZS5zaG93KHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogbW9kYWxUZW1wbGF0ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnNhdmUoSlNPTi5zdHJpbmdpZnkodGhpcy5hcGkpKVxuICAgICAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUuYXBpcy51bnNoaWZ0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnbW9kYWwnXG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuYWRkUHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBEaWFsb2dTZXJ2aWNlLnNob3coe1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBwcm9qZWN0VGVtcGxhdGUsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnByb2plY3RzID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBwcm9qZWN0U2VydmljZS5zYXZlKEpTT04uc3RyaW5naWZ5KHtuYW1lOiB0aGlzLm5hbWV9KSlcbiAgICAgICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3RzLnVuc2hpZnQoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Byb2plY3QnXG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuZ29BcGkgPSBmdW5jdGlvbihhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwaUl0ZW0nLCBKU09OLnN0cmluZ2lmeShhcGkpKTtcbiAgICAgICAgJHJvb3RTY29wZS50eXBlID0gJ2FwaSc7XG4gICAgICAgICRsb2NhdGlvbi51cmwoYC9hcGlzLyR7YXBpLm5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1Byb2plY3RBcGkgPSBmdW5jdGlvbihuYW1lLCBhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcGlJdGVtJywgSlNPTi5zdHJpbmdpZnkoYXBpKSk7XG4gICAgICAgIHZhciB1cmxOYW1lID0gYXBpLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3Byb2plY3RzLyR7bmFtZX0vYXBpcy8ke3VybE5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1VybCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHVybE5hbWUgPSBkYXRhLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1cmxJdGVtJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAndXJsJztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3VybHMvJHt1cmxOYW1lfWApO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZUFwaSA9IGZ1bmN0aW9uKGFwaSwgaW5kZXgpIHtcbiAgICAgICAgYXBpU2VydmljZS5yZW1vdmUoe25hbWU6IGFwaS5uYW1lfSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmFwaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZVVybCA9IGZ1bmN0aW9uKHVybCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHVybE5hbWUgPSB1cmwucmVwbGFjZSgvXFwvLywgJycpLnJlcGxhY2UoL1xcLy9nLCAnLScpO1xuICAgICAgICB1cmxTZXJ2aWNlLnJlbW92ZSh7bmFtZTogdXJsTmFtZX0pXG4gICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS51cmxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5kZWxldGVQcm9qZWN0QXBpID0gZnVuY3Rpb24ocGFyZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgcHJvamVjdCA9ICRzY29wZS5wcm9qZWN0c1twYXJlbnRdO1xuICAgICAgICB2YXIgYXBpID0gcHJvamVjdC5kYXRhW2luZGV4XTtcbiAgICAgICAgJGh0dHAuZGVsZXRlKGAvcmVzdGFwaS9wcm9qZWN0cy8ke3Byb2plY3QubmFtZX0/dXJsPSR7YXBpLnVybH1gKVxuICAgICAgICAgIC5zdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgIHByb2plY3QuZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS50eXBlID0gJ3Byb2plY3QnO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnVybCgnLycpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICflh7rplJnkuoYhJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNpZGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9jb21wb25lbnRzL2FzaWRlL2FzaWRlLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC9jb21wb25lbnRzL21vZGFsL21vZGFsLmh0bWwnO1xudmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcIm1vZGFsIGluXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIHN0eWxlPVxcXCJkaXNwbGF5OiBibG9jazsgcGFkZGluZy1yaWdodDogMTVweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNSlcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyIHRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgIDxoNCBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPuaWsGFwaTwvaDQ+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+XFxuICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIiBub3ZhbGlkYXRlPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJhcGlOYW1lXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+TmFtZTwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiYXBpTmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm1vZGFsLmFwaS5uYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcInVybFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlVybDwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwidXJsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibW9kYWwuYXBpLnVybFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJtZXRob2RcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5NZXRob2Q8L2xhYmVsPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJtZXRob2RcXFwiIG5nLW1vZGVsPVxcXCJtb2RhbC5hcGkubWV0aG9kXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZ2V0XFxcIj5HRVQ8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicG9zdFxcXCI+UE9TVDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwdXRcXFwiPlBVVDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJkZWxldGVcXFwiPkRFTEVURTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwYXRjaFxcXCI+UEFUQ0g8L29wdGlvbj5cXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZm9ybT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIG5nLWNsaWNrPVxcXCJtb2RhbC5oaWRlKClcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPuWPlua2iDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJtb2RhbC5zdWJtaXQoKVxcXCI+5Yib5bu6YXBpPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG53aW5kb3cuYW5ndWxhci5tb2R1bGUoJ25nJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbihjKSB7IGMucHV0KHBhdGgsIGh0bWwpIH1dKTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2NvbXBvbmVudHMvbW9kYWwvcHJvamVjdE1vZGFsLmh0bWwnO1xudmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcIm1vZGFsIGluXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiIHN0eWxlPVxcXCJkaXNwbGF5OiBibG9jazsgcGFkZGluZy1yaWdodDogMTVweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNSlcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyIHRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgIDxoNCBjbGFzcz1cXFwibW9kYWwtdGl0bGVcXFwiPua3u+WKoOaWsOmhueebrjwvaDQ+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCI+XFxuICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIiBub3ZhbGlkYXRlPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJuYW1lXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+6aG555uu5ZCNOjwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwibmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInByb2plY3QubmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcInByb2plY3QuaGlkZSgpXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj7lj5bmtog8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwicHJvamVjdC5zdWJtaXQoKVxcXCI+5Yib5bu66aG555uuPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG53aW5kb3cuYW5ndWxhci5tb2R1bGUoJ25nJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbihjKSB7IGMucHV0KHBhdGgsIGh0bWwpIH1dKTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NvbXBvbmVudHMvbW9kYWwvcHJvamVjdE1vZGFsLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC9jb21wb25lbnRzL2FzaWRlL2FzaWRlLmh0bWwnO1xudmFyIGh0bWwgPSBcIjxhc2lkZT5cXG4gIDx1bCBjbGFzcz1cXFwibmF2IG5hdi10YWJzXFxcIiBuZy1pbml0PVxcXCJxdWVyeUFwaSgpXFxcIj5cXG4gICAgPGxpIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6ICRyb290LnR5cGUgPT09ICdhcGknfVxcXCI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBuZy1jbGljaz1cXFwicXVlcnlBcGkoKVxcXCI+YXBp5YiX6KGoPC9hPjwvbGk+XFxuICAgIDxsaSBuZy1jbGFzcz1cXFwieydhY3RpdmUnOiAkcm9vdC50eXBlID09PSAndXJsJ31cXFwiPjxhIGhyZWY9XFxcIkphdmFzY3JpcHQ6O1xcXCIgbmctY2xpY2s9XFxcInF1ZXJ5VXJsKClcXFwiPuaOpeWPo+WIl+ihqDwvYT48L2xpPlxcbiAgICA8bGkgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ3Byb2plY3QnfVxcXCI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBuZy1jbGljaz1cXFwicXVlcnlQcm9qZWN0KClcXFwiPumhueebruWIl+ihqDwvYT48L2xpPlxcbiAgPC91bD5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwidGFiLXBhbmVcXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6ICRyb290LnR5cGUgPT09ICdhcGknfVxcXCI+XFxuICAgICAgPHVsIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIj5cXG4gICAgICAgIDxsaSBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGNsZWFyZml4XFxcIiBuZy1yZXBlYXQ9XFxcImFwaSBpbiBhcGlzXFxcIj5cXG4gICAgICAgICAgPHNwYW4gbmctYmluZD1cXFwiYXBpLm5hbWVcXFwiIGNsYXNzPVxcXCJwdWxsLWxlZnRcXFwiIG5nLWNsaWNrPVxcXCJnb0FwaShhcGkpXFxcIj48L3NwYW4+XFxuICAgICAgICAgIDxhIGhyZWYgPSBcXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcyA9IFxcXCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0IGJ0bi1zbVxcXCIgbmctY2xpY2s9XFxcImRlbGV0ZUFwaShhcGksICRpbmRleClcXFwiPuWIoOmZpDwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG5cXG4gICAgICA8Zm9vdGVyPjxhIGhyZWY9XFxcIkphdmFzY3JpcHQ6O1xcXCIgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIiBuZy1jbGljaz1cXFwiYWRkQXBpKClcXFwiPjxpIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcXFwiPjwvaT48L2E+PC9mb290ZXI+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZSB1cmwtY29udGVudFxcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ3VybCd9XFxcIj5cXG4gICAgICA8dWwgY2xhc3M9XFxcImxpbmstbGlzdFxcXCI+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImNsZWFyZml4IHVybC1pdGVtXFxcIiBuZy1yZXBlYXQ9XFxcImRhdGEgaW4gdXJsc1xcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0ZXh0LXByaW1hcnkgdGV4dC1saW5rIHB1bGwtbGVmdFxcXCIgbmctYmluZD1cXFwiZGF0YS51cmxcXFwiIG5nLWNsaWNrPVxcXCJnb1VybChkYXRhKVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICA8YSBocmVmID0gXFxcIkphdmFzY3JpcHQ6O1xcXCIgY2xhc3MgPSBcXFwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaCBwdWxsLXJpZ2h0IHRleHQtZGFuZ2VyXFxcIiBuZy1jbGljaz1cXFwiZGVsZXRlVXJsKGRhdGEudXJsLCAkaW5kZXgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogOHB4O1xcXCI+PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidGFiLXBhbmVcXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6ICRyb290LnR5cGUgPT09ICdwcm9qZWN0J31cXFwiPlxcbiAgICAgIDx1aWItYWNjb3JkaW9uPlxcbiAgICAgICAgPHVpYi1hY2NvcmRpb24tZ3JvdXAgaXMtb3Blbj1cXFwib3BlblxcXCIgbmctcmVwZWF0PVxcXCJwcm9qZWN0IGluIHByb2plY3RzXFxcIj5cXG4gICAgICAgICAgPHVpYi1hY2NvcmRpb24taGVhZGluZz5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZ2x5cGhpY29uXFxcIiBuZy1jbGFzcz1cXFwieydnbHlwaGljb24tZm9sZGVyLW9wZW4nOiBvcGVuLCAnZ2x5cGhpY29uLWZvbGRlci1jbG9zZSc6ICFvcGVufVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDxzcGFuIG5nLWJpbmQ9XFxcInByb2plY3QubmFtZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJwdWxsLXJpZ2h0IGdseXBoaWNvblxcXCIgbmctY2xhc3M9XFxcInsnZ2x5cGhpY29uLWNoZXZyb24tZG93bic6IG9wZW4sICdnbHlwaGljb24tY2hldnJvbi1yaWdodCc6ICFvcGVufVxcXCI+PC9pPlxcbiAgICAgICAgICA8L3VpYi1hY2NvcmRpb24taGVhZGluZz5cXG4gICAgICAgICAgPGRpdiBuZy1pZj1cXFwicHJvamVjdC5kYXRhLmxlbmd0aCA8PSAwXFxcIiBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgIDxwPuivpemhueebrui/mOayoeaciea3u+WKoOi3r+eUsei1tue0p+WOu+a3u+WKoOWQpyE8L3A+XFxuICAgICAgICAgICAgPGEgbmctY2xpY2s9XFxcInF1ZXJ5VXJsKClcXFwiIGNsYXNzID0gXFxcImJ0biBidG4tZGFuZ2VyXFxcIj7ljrvmt7vliqDmjqXlj6M8L2E+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8dWwgY2xhc3M9XFxcImxpbmstbGlzdFxcXCIgbmctaWY9XFxcInByb2plY3QuZGF0YS5sZW5ndGggPiAwXFxcIj5cXG4gICAgICAgICAgICA8bGkgbmctcmVwZWF0PVxcXCJhcGkgaW4gcHJvamVjdC5kYXRhIHRyYWNrIGJ5ICRpbmRleFxcXCIgY2xhc3M9XFxcImNsZWFyZml4XFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0ZXh0LXByaW1hcnkgdGV4dC1saW5rIHB1bGwtbGVmdFxcXCIgbmctYmluZD1cXFwiYXBpLnVybFxcXCIgbmctY2xpY2s9XFxcImdvUHJvamVjdEFwaShwcm9qZWN0Lm5hbWUsIGFwaSlcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgIDxhIGhyZWYgPSBcXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcyA9IFxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoIHB1bGwtcmlnaHQgdGV4dC1kYW5nZXJcXFwiIG5nLWNsaWNrPVxcXCJkZWxldGVQcm9qZWN0QXBpKCRwYXJlbnQuJGluZGV4LCAkaW5kZXgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogOHB4O1xcXCI+PC9hPlxcbiAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L3VpYi1hY2NvcmRpb24tZ3JvdXA+XFxuICAgICAgPC91aWItYWNjb3JkaW9uPlxcblxcbiAgICAgIDxmb290ZXI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiIG5nLWNsaWNrPVxcXCJhZGRQcm9qZWN0KClcXFwiPjxpIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcXFwiPjwvaT48L2E+PC9mb290ZXI+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9hc2lkZT5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9hc2lkZS9hc2lkZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImFuZ3VsYXIubW9kdWxlKCdlbGVtZS5hcGlzJywgW10pXG4gIC5mYWN0b3J5KCdhcGlTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvYXBpcy86bmFtZScsIHtuYW1lIDogJ0BuYW1lJ30sIHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCd1cmxTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvdXJscy86bmFtZScsIHtuYW1lIDogJ0BuYW1lJ30sIHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdwcm9qZWN0U2VydmljZScsLyogQG5nSW5qZWN0ICovKCRyZXNvdXJjZSkgPT4ge1xuICAgIHJldHVybiAkcmVzb3VyY2UoJy9yZXN0YXBpL3Byb2plY3RzLzpuYW1lJywge25hbWUgOiAnQG5hbWUnfSwge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9hcGkuanNcbiAqKi8iLCJcbmNvbnN0IHJvdXRlQ29uZmlnID0gW1xuICBbJy8nLCByZXF1aXJlKCcuL2luZGV4L2luZGV4JyldLFxuICBbJy9hcGlzLzpuYW1lJywgcmVxdWlyZSgnLi9hcGlEZXRhaWwvZGV0YWlsJyldLFxuICBbJy91cmxzLzpuYW1lJywgcmVxdWlyZSgnLi91cmxEZXRhaWwvdXJsJyldLFxuICBbJy9wcm9qZWN0cy86cHJvamVjdC9hcGlzLzpuYW1lJywgcmVxdWlyZSgnLi9wcm9qZWN0RGV0YWlsL3Byb2plY3QnKV1cbl07XG5cbmNvbnN0IGNvbmZpZyA9ICAvKiBAbmdJbmplY3QgKi9bXCIkcm91dGVQcm92aWRlclwiLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICByb3V0ZUNvbmZpZy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAkcm91dGVQcm92aWRlci53aGVuKGNvbmZpZ1swXSwgY29uZmlnWzFdKTtcbiAgfSk7XG5cbiAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy80MDQnIH0pO1xufV07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvcm91dGUuanNcbiAqKi8iLCJyZXF1aXJlKCcuL2luZGV4Lmh0bWwnKTtcblxuY2xhc3Mgb3JkZXJDdHJsIHtcbiAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgIHJldHVybiBbICckc2NvcGUnXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcvYXBwL2luZGV4L2luZGV4Lmh0bWwnLFxuICBjb250cm9sbGVyOiBvcmRlckN0cmwsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2luZGV4L2luZGV4LmpzXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC9pbmRleC9pbmRleC5odG1sJztcbnZhciBodG1sID0gXCI8cD7ov5nph4zmmK/pppbpobU8L3A+XCI7XG53aW5kb3cuYW5ndWxhci5tb2R1bGUoJ25nJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbihjKSB7IGMucHV0KHBhdGgsIGh0bWwpIH1dKTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2luZGV4L2luZGV4Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi9kZXRhaWwuaHRtbCcpO1xuXG5jbGFzcyBhcGlJdGVtQ3RybCB7XG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gWyAnYXBpU2VydmljZScsICckbG9jYXRpb24nLCAnJHNjb3BlJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvciggYXBpU2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUgKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHsgYXBpU2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUgfTtcbiAgICB0aGlzLmFwaSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwaUl0ZW0nKSk7XG4gICAgdGhpcy5qc29uTW9kZSA9IHttb2RlOiAndHJlZSd9O1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIHZhciB7IGFwaVNlcnZpY2UsICRsb2NhdGlvbiwgJHNjb3BlIH0gPSB0aGlzLnNlcnZpY2VzO1xuICAgIHZhciBkYXRhID0gYW5ndWxhci5jb3B5KHRoaXMuYXBpKTtcblxuICAgIGFwaVNlcnZpY2Uuc2F2ZSh7bmFtZTogdGhpcy5hcGkubmFtZX0sIGRhdGEpXG4gICAgICAuJHByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmlbDmja7kv53lrZjmiJDlip8nLFxuICAgICAgICAgIHRleHQ6ICfmjqXlj6Pmm7TmlrDmiJDlip8h6LW257Sn6YeN5ZCvbW9jayBzZXJ2ZXLlkKchJyxcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9LCAoaXNDb25maXJtKSA9PiB7XG4gICAgICAgICAgJGxvY2F0aW9uLnVybCgnLycpO1xuICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICB9XG5cbiAgc2V0TW9kZUNvZGUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ2NvZGUnO1xuICB9XG5cbiAgc2V0TW9kZVRyZWUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ3RyZWUnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZVVybDogJy9hcHAvYXBpRGV0YWlsL2RldGFpbC5odG1sJyxcbiAgY29udHJvbGxlcjogYXBpSXRlbUN0cmwsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwaURldGFpbC9kZXRhaWwuanNcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2FwaURldGFpbC9kZXRhaWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCIgbmctaW5pdD1cXFwidm0uZ2V0QXBpKClcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgIDxoMSBjbGFzcz1cXFwicGFuZWwtdGl0bGUgdGV4dC1jZW50ZXJcXFwiIG5nLWJpbmQ9XFxcIifmjqXlj6PlkI3np7AnICsgdm0uYXBpLm5hbWVcXFwiIG5nLWlmPVxcXCJ2bS5hcGkubmFtZVxcXCI+PC9oMT5cXG4gIDwvZGl2PlxcbiAgPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCIgbm92YWxpZGF0ZT5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJ1cmxcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5Vcmw8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGlucHV0IGlkPVxcXCJ1cmxcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ2bS5hcGkudXJsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwibWV0aG9kXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+TWV0aG9kPC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcIm1ldGhvZFxcXCIgbmctbW9kZWw9XFxcInZtLmFwaS5tZXRob2RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImdldFxcXCI+R0VUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicG9zdFxcXCI+UE9TVDwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInB1dFxcXCI+UFVUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZGVsZXRlXFxcIj5ERUxFVEU8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwYXRjaFxcXCI+UEFUQ0g8L29wdGlvbj5cXG4gICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgIDxsYWJlbCBmb3IgPSBcXFwicmVzcG9uc2VcXFwiIGNsYXNzID0gXFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlJlc3BvbnNlOjwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8ZGl2IG5nLWpzb25lZGl0b3IgbmctbW9kZWw9XFxcInZtLmFwaS5yZXNwb25zZVxcXCIgbmFtZSA9ICdqc29uRWRpdG9yJyBvcHRpb25zPVxcXCJ2bS5qc29uTW9kZVxcXCIgc3R5bGU9XFxcIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDMwMHB4O1xcXCIgcHJlZml4LXRleHQ9XFxcInRydWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8YSAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnNldE1vZGVDb2RlKClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAxNnB4O1xcXCIgbmctaWY9XFxcInZtLmpzb25Nb2RlLm1vZGUgPT09ICd0cmVlJ1xcXCI+cmVzcG9uc2XliIfmjaJjb2Rl5qih5byPPC9hPlxcbiAgICAgICAgICA8YSAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnNldE1vZGVUcmVlKClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAxNnB4O1xcXCIgbmctaWY9XFxcInZtLmpzb25Nb2RlLm1vZGUgPT09ICdjb2RlJ1xcXCI+cmVzcG9uc2XliIfmjaJ0cmVl5qih5byPPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1mb290ZXJcXFwiPlxcbiAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc3VibWl0KClcXFwiPuS/neWtmDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZm9ybT5cXG48L2Rpdj5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvYXBpRGV0YWlsL2RldGFpbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vdXJsLmh0bWwnKTtcbnJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbmNsYXNzIHVybEl0ZW1DdHJsIHtcbiAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgIHJldHVybiBbICdwcm9qZWN0U2VydmljZScsICckcm91dGVQYXJhbXMnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb2plY3RTZXJ2aWNlLCAkcm91dGVQYXJhbXMpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0geyBwcm9qZWN0U2VydmljZSwgJHJvdXRlUGFyYW1zIH07XG4gICAgdmFyIHVybEl0ZW0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1cmxJdGVtJykpO1xuICAgIHRoaXMuYXBpcyA9IHVybEl0ZW0uZGF0YTtcbiAgICB0aGlzLnBvc3REYXRhID0ge1xuICAgICAgdXJsOiB1cmxJdGVtLnVybCxcbiAgICAgIHByb2plY3Q6IG51bGwsXG4gICAgICBhcGk6IG51bGxcbiAgICB9XG4gIH1cblxuICBjaG9vc2UoYXBpKSB7XG4gICAgdGhpcy5wb3N0RGF0YS5hcGkgPSBhcGk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdmFyIHsgcHJvamVjdFNlcnZpY2UgfSA9IHRoaXMuc2VydmljZXM7XG5cbiAgICBwcm9qZWN0U2VydmljZS5zYXZlKHtuYW1lOiB0aGlzLnBvc3REYXRhLnByb2plY3R9LCBKU09OLnN0cmluZ2lmeSh0aGlzLnBvc3REYXRhLmFwaSkpXG4gICAgICAuJHByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmlbDmja7kv53lrZjmiJDlip8nLFxuICAgICAgICAgIHRleHQ6ICfmjqXlj6Pmm7TmlrDmiJDlip8h6LW257Sn6YeN5ZCvbW9jayBzZXJ2ZXLlkKchJyxcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG5cbiAgZmV0Y2hQcm9qZWN0cygpIHtcbiAgICB2YXIgeyBwcm9qZWN0U2VydmljZSB9ID0gdGhpcy5zZXJ2aWNlcztcblxuICAgIHByb2plY3RTZXJ2aWNlLnF1ZXJ5KHt9KVxuICAgICAgLiRwcm9taXNlXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gZGF0YTtcbiAgICAgIH0pO1xuICB9XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcvYXBwL3VybERldGFpbC91cmwuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IHVybEl0ZW1DdHJsLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC91cmxEZXRhaWwvdXJsLmpzXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC91cmxEZXRhaWwvdXJsLmh0bWwnO1xudmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keSBmb3JtLWhvcml6b250YWxcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICA8bGFiZWwgZm9yPVxcXCJ1cmxcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5Vcmw8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8aW5wdXQgaWQ9XFxcInVybFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInZtLnBvc3REYXRhLnVybFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1pbml0PVxcXCJ2bS5mZXRjaFByb2plY3RzKClcXFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XFxcIm1ldGhvZFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlByb2plY3Q6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgPHNlbGVjdCBpZD1cXFwibWV0aG9kXFxcIiBuZy1tb2RlbD1cXFwidm0ucG9zdERhdGEucHJvamVjdFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInt7IHByb2plY3QubmFtZSB9fVxcXCIgbmctcmVwZWF0PVxcXCJwcm9qZWN0IGluIHZtLnByb2plY3RzXFxcIiBuZy1iaW5kPVxcXCJwcm9qZWN0Lm5hbWVcXFwiPjwvb3B0aW9uPlxcbiAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPkFQSTo8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWluZm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6IGFwaSA9PT0gdm0ucG9zdERhdGEuYXBpIH1cXFwiIG5nLXJlcGVhdD1cXFwiYXBpIGluIHZtLmFwaXNcXFwiIG5nLWJpbmQ9XFxcImFwaS5uYW1lXFxcIiBuZy1jbGljaz1cXFwidm0uY2hvb3NlKGFwaSlcXFwiPjwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zdWJtaXQoKVxcXCI+5L+d5a2Y5pWw5o2uPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvdXJsRGV0YWlsL3VybC5odG1sXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC91cmxEZXRhaWwvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vcHJvamVjdC5odG1sJyk7XG5cbmNsYXNzIHByb2plY3RDdHJsIHtcblxuICAvL+azqOWFpemhuuW6j+WSjOWIneWni+WMlumhuuW6j1xuICBzdGF0aWMgZ2V0ICRpbmplY3QoKSB7XG4gICAgcmV0dXJuIFsgJ3Byb2plY3RTZXJ2aWNlJywgJyRsb2NhdGlvbicsICckcm91dGVQYXJhbXMnLCAnJHJvb3RTY29wZScsICckaHR0cCddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoIHByb2plY3RTZXJ2aWNlLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgJHJvb3RTY29wZSwgJGh0dHApIHtcbiAgICB0aGlzLnNlcnZpY2VzID0geyAkbG9jYXRpb24sIHByb2plY3RTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkaHR0cH07XG4gICAgdGhpcy5uYW1lID0gJHJvdXRlUGFyYW1zLnByb2plY3Q7XG4gICAgdGhpcy5hcGkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0QXBpSXRlbScpKTtcbiAgICB0aGlzLmpzb25Nb2RlID0ge21vZGU6ICd0cmVlJ307XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdmFyIHsgcHJvamVjdFNlcnZpY2UgfSA9IHRoaXMuc2VydmljZXM7XG5cbiAgICBwcm9qZWN0U2VydmljZS51cGRhdGUoe25hbWU6IHRoaXMubmFtZX0sIEpTT04uc3RyaW5naWZ5KHRoaXMuYXBpKSkuJHByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmlbDmja7kv53lrZjmiJDlip8nLFxuICAgICAgICAgIHRleHQ6ICfmjqXlj6Pmm7TmlrDmiJDlip8h6LW257Sn6YeN5ZCvbW9jayBzZXJ2ZXLlkKchJyxcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG5cbiAgc2V0TW9kZUNvZGUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ2NvZGUnO1xuICB9XG5cbiAgc2V0TW9kZVRyZWUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ3RyZWUnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZVVybDogJy9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0Lmh0bWwnLFxuICBjb250cm9sbGVyOiBwcm9qZWN0Q3RybCxcbiAgY29udHJvbGxlckFzOiAndm0nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0LmpzXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCIgbmctaW5pdD1cXFwidm0uZ2V0QXBpKClcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgIDxoMSBjbGFzcz1cXFwicGFuZWwtdGl0bGUgdGV4dC1jZW50ZXJcXFwiIG5nLWJpbmQ9XFxcIifpobnnm67lkI3np7A6JyArIHZtLm5hbWVcXFwiIG5nLWlmPVxcXCJ2bS5uYW1lXFxcIj48L2gxPlxcbiAgPC9kaXY+XFxuICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIiBub3ZhbGlkYXRlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgIDxsYWJlbCBmb3I9XFxcInVybFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlVybDwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8aW5wdXQgaWQ9XFxcInVybFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInZtLmFwaS51cmxcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJtZXRob2RcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5NZXRob2Q8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPHNlbGVjdCBpZD1cXFwibWV0aG9kXFxcIiBuZy1tb2RlbD1cXFwidm0uYXBpLm1ldGhvZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZ2V0XFxcIj5HRVQ8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwb3N0XFxcIj5QT1NUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicHV0XFxcIj5QVVQ8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJkZWxldGVcXFwiPkRFTEVURTwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInBhdGNoXFxcIj5QQVRDSDwvb3B0aW9uPlxcbiAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvciA9IFxcXCJyZXNwb25zZVxcXCIgY2xhc3MgPSBcXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+UmVzcG9uc2U6PC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxkaXYgbmctanNvbmVkaXRvciBuZy1tb2RlbD1cXFwidm0uYXBpLnJlc3BvbnNlXFxcIiBvcHRpb25zPVxcXCJ2bS5qc29uTW9kZVxcXCIgc3R5bGU9XFxcIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDMwMHB4O1xcXCIgcHJlZml4LXRleHQ9XFxcInRydWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8YSAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnNldE1vZGVDb2RlKClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAxNnB4O1xcXCIgbmctaWY9XFxcInZtLmpzb25Nb2RlLm1vZGUgPT09ICd0cmVlJ1xcXCI+cmVzcG9uc2XliIfmjaJjb2Rl5qih5byPPC9hPlxcbiAgICAgICAgICA8YSAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnNldE1vZGVUcmVlKClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAxNnB4O1xcXCIgbmctaWY9XFxcInZtLmpzb25Nb2RlLm1vZGUgPT09ICdjb2RlJ1xcXCI+cmVzcG9uc2XliIfmjaJ0cmVl5qih5byPPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1mb290ZXJcXFwiPlxcbiAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc3VibWl0KClcXFwiPuabtOaWsDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZm9ybT5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==