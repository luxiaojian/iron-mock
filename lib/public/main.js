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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	__webpack_require__(7);
	
	__webpack_require__(14);
	
	var _route = __webpack_require__(15);
	
	var _route2 = _interopRequireDefault(_route);
	
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
	}]).config(_route2['default']).run( /* ngInject */["$rootScope", "$http", function ($rootScope, $http) {
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dialog = __webpack_require__(6);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	angular.module('eleme.services', []).factory('DialogService', ['$http', '$rootScope', '$controller', '$compile', '$q', '$templateRequest', function ($http, $rootScope, $controller, $compile, $q, $templateRequest) {
	  return new _dialog2['default']({ $http: $http, $rootScope: $rootScope, $controller: $controller, $compile: $compile, $q: $q, $templateRequest: $templateRequest });
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _asideAside = __webpack_require__(8);
	
	var _asideAside2 = _interopRequireDefault(_asideAside);
	
	angular.module('eleme.directives', []).directive('elemeAside', _asideAside2['default']);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(9);
	
	var _modalModalHtml = __webpack_require__(11);
	
	var _modalModalHtml2 = _interopRequireDefault(_modalModalHtml);
	
	var _modalProjectModalHtml = __webpack_require__(12);
	
	var _modalProjectModalHtml2 = _interopRequireDefault(_modalProjectModalHtml);
	
	var _asideHtml = __webpack_require__(13);
	
	var _asideHtml2 = _interopRequireDefault(_asideHtml);
	
	function /* @ngInject */aside(DialogService, apiService, urlService, projectService, $location, $rootScope, $http) {
	  return {
	    restrict: 'AE',
	    scope: {},
	    templateUrl: _asideHtml2['default'],
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
	          templateUrl: _modalModalHtml2['default'],
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
	          templateUrl: _modalProjectModalHtml2['default'],
	          controller: function controller() {
	            var _this2 = this;
	
	            this.hide = function () {
	              _this2.$dialog.hide();
	            };
	
	            this.projects = [];
	
	            this.submit = function () {
	              projectService.save(JSON.stringify(_this2.project)).$promise.then(function (data) {
	                $scope.projects.unshift(data);
	
	                _this2.$dialog.hide();
	              });
	            };
	          },
	          controllerAs: 'modal'
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
	        var api = project.data.apis[index];
	        $http['delete']('/restapi/projects/' + project.name + '?url=' + api.url).success(function () {
	          project.data.apis.splice(index, 1);
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
	
	exports['default'] = aside;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	var path = '/app/components/modal/modal.html';
	var html = "<div class=\"modal in\" role=\"dialog\" style=\"display: block; padding-right: 15px; background-color: rgba(0, 0, 0, .5)\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title\">添加新的请求</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form class=\"form-horizontal\" novalidate>\n          <div class=\"form-group\">\n            <label for=\"apiName\" class=\"col-sm-2 control-label\">Name</label>\n            <div class=\"col-sm-10\">\n              <input id=\"apiName\" type=\"text\" ng-model=\"modal.api.name\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n            <div class=\"col-sm-10\">\n              <input id=\"url\" type=\"text\" ng-model=\"modal.api.url\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n            <div class=\"col-sm-10\">\n              <select id=\"method\" ng-model=\"modal.api.method\" class=\"form-control\">\n                <option value=\"get\">GET</option>\n                <option value=\"post\">POST</option>\n                <option value=\"put\">PUT</option>\n                <option value=\"delete\">DELETE</option>\n                <option value=\"patch\">PATCH</option>\n              </select>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" ng-click=\"modal.hide()\" class=\"btn btn-default\">取消</button>\n        <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"modal.submit()\">创建api</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var path = '/app/components/modal/projectModal.html';
	var html = "<div class=\"modal in\" role=\"dialog\" style=\"display: block; padding-right: 15px; background-color: rgba(0, 0, 0, .5)\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title\">添加新项目</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form class=\"form-horizontal\" novalidate>\n          <div class=\"form-group\">\n            <label for=\"name\" class=\"col-sm-2 control-label\">name</label>\n            <div class=\"col-sm-10\">\n              <input id=\"name\" type=\"text\" ng-model=\"modal.project.name\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"hostname\" class=\"col-sm-2 control-label\">hostname</label>\n            <div class=\"col-sm-10\">\n              <input id=\"hostname\" type=\"text\" ng-model=\"modal.project.hostname\" class=\"form-control\">\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" ng-click=\"modal.hide()\" class=\"btn btn-default\">取消</button>\n        <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"modal.submit()\">创建项目</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var path = '/app/components/aside/aside.html';
	var html = "<aside>\n  <ul class=\"nav nav-tabs\" ng-init=\"queryApi()\">\n    <li ng-class=\"{'active': $root.type === 'api'}\"><a href=\"Javascript:;\" ng-click=\"queryApi()\">请求列表</a></li>\n    <li ng-class=\"{'active': $root.type === 'project'}\"><a href=\"Javascript:;\" ng-click=\"queryProject()\">项目列表</a></li>\n  </ul>\n\n  <div class=\"tab-content\">\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'api'}\">\n      <input type = \"text\" placeholder=\"搜索api\" class=\"form-control form-search\" ng-model=\"apiSearch\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item clearfix\" ng-repeat=\"api in apis | filter: apiSearch\">\n          <span ng-bind=\"api.name\" class=\"pull-left\" ng-click=\"goApi(api)\"></span>\n          <a href = \"Javascript:;\" class = \"btn btn-danger pull-right btn-sm\" ng-click=\"deleteApi(api, $index)\">删除</a>\n        </li>\n      </ul>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addApi()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'project'}\">\n      <uib-accordion>\n        <uib-accordion-group is-open=\"open\" ng-repeat=\"project in projects\">\n          <uib-accordion-heading>\n            <i class=\"glyphicon\" ng-class=\"{'glyphicon-folder-open': open, 'glyphicon-folder-close': !open}\"></i>\n            <span ng-bind=\"project.name\"></span>\n            <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open, 'glyphicon-chevron-right': !open}\"></i>\n          </uib-accordion-heading>\n          <div ng-if=\"project.data.apis.length <= 0\" class=\"text-center\">\n            <p>该项目还没有添加路由赶紧去添加吧!</p>\n            <a ng-click=\"queryUrl()\" class = \"btn btn-danger\">去添加接口</a>\n          </div>\n          <ul class=\"link-list\" ng-if=\"project.data && project.data.apis.length > 0\">\n            <li ng-repeat=\"api in project.data.apis track by $index\" class=\"clearfix\">\n              <span class=\"text-primary text-link pull-left\" ng-bind=\"api.url\" ng-click=\"goProjectApi(project.name, api)\"></span>\n              <a href = \"Javascript:;\" class = \"glyphicon glyphicon-trash pull-right text-danger\" ng-click=\"deleteProjectApi($parent.$index, $index)\" style=\"margin-top: 8px;\"></a>\n            </li>\n          </ul>\n        </uib-accordion-group>\n      </uib-accordion>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addProject()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n  </div>\n</aside>\n";
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
	}).factory('typeService', /* @ngInject */function ($resource) {
	  return $resource('/restapi/types/:name', { name: '@name' }, {
	    update: {
	      method: 'PUT'
	    }
	  });
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _apiDetailDetail = __webpack_require__(16);
	
	var _apiDetailDetail2 = _interopRequireDefault(_apiDetailDetail);
	
	var _urlDetailUrl = __webpack_require__(18);
	
	var _urlDetailUrl2 = _interopRequireDefault(_urlDetailUrl);
	
	var _projectDetailProject = __webpack_require__(23);
	
	var _projectDetailProject2 = _interopRequireDefault(_projectDetailProject);
	
	var _indexIndex = __webpack_require__(24);
	
	var _indexIndex2 = _interopRequireDefault(_indexIndex);
	
	var routeConfig = [['/', _indexIndex2['default']], ['/apis/:name', _apiDetailDetail2['default']], ['/urls/:name', _urlDetailUrl2['default']], ['/projects/:project/apis/:name', _projectDetailProject2['default']]];
	
	var config = /* @ngInject */["$routeProvider", function ($routeProvider) {
	  routeConfig.forEach(function (config) {
	    $routeProvider.when(config[0], config[1]);
	  });
	
	  $routeProvider.otherwise({ redirectTo: '/404' });
	}];
	
	exports['default'] = config;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(17);
	
	var apiItemCtrl = (function () {
	  _createClass(apiItemCtrl, null, [{
	    key: '$inject',
	    get: function get() {
	      return ['apiService', 'projectService', '$location', '$scope'];
	    }
	  }]);
	
	  function apiItemCtrl(apiService, projectService, $location, $scope) {
	    _classCallCheck(this, apiItemCtrl);
	
	    this.services = { apiService: apiService, projectService: projectService, $location: $location, $scope: $scope };
	    this.api = JSON.parse(localStorage.getItem('apiItem'));
	    this.jsonMode = { mode: 'tree' };
	  }
	
	  _createClass(apiItemCtrl, [{
	    key: 'submit',
	    value: function submit() {
	      var _this = this;
	
	      var _services = this.services;
	      var apiService = _services.apiService;
	      var projectService = _services.projectService;
	      var $location = _services.$location;
	      var $scope = _services.$scope;
	
	      var data = angular.copy(this.api);
	
	      apiService.save({ name: this.api.name }, data).$promise.then(function () {
	        return projectService.save({ name: _this.projectName }, { name: _this.api.name }).$promise;
	      }).then(function () {
	        swal({
	          title: '数据保存成功',
	          text: '接口更新成功!赶紧重启mock server吧!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        }, function (isConfirm) {
	          $location.url('/');
	          $scope.$apply();
	        });
	      })['catch'](function (e) {
	        swal({
	          title: '出错了!',
	          text: e.message,
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
	    key: 'fetchProjects',
	    value: function fetchProjects() {
	      var _this2 = this;
	
	      var projectService = this.services.projectService;
	
	      projectService.query({}).$promise.then(function (data) {
	        _this2.projects = data;
	      });
	    }
	  }, {
	    key: 'setModeTree',
	    value: function setModeTree() {
	      this.jsonMode.mode = 'tree';
	    }
	  }]);
	
	  return apiItemCtrl;
	})();
	
	exports['default'] = {
	  templateUrl: '/app/apiDetail/detail.html',
	  controller: apiItemCtrl,
	  controllerAs: 'vm'
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/app/apiDetail/detail.html';
	var html = "<div class=\"panel panel-default\" ng-init=\"vm.getApi()\">\n  <div class=\"panel-heading\">\n    <h1 class=\"panel-title text-center\" ng-bind=\"'接口名称' + vm.api.name\" ng-if=\"vm.api.name\"></h1>\n  </div>\n  <form class=\"form-horizontal\" novalidate>\n    <div class=\"panel-body\">\n      <div class=\"form-group\">\n        <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n        <div class=\"col-sm-10\">\n          <input id=\"url\" type=\"text\" ng-model=\"vm.api.url\" class=\"form-control\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n        <div class=\"col-sm-10\">\n          <select id=\"method\" ng-model=\"vm.api.method\" class=\"form-control\">\n            <option value=\"get\">GET</option>\n            <option value=\"post\">POST</option>\n            <option value=\"put\">PUT</option>\n            <option value=\"delete\">DELETE</option>\n            <option value=\"patch\">PATCH</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-init=\"vm.fetchProjects()\">\n        <label for=\"method\" class=\"col-sm-2 control-label\">Project</label>\n        <div class=\"col-sm-10\">\n          <select id=\"method\" ng-model=\"vm.projectName\" class=\"form-control\">\n            <option value=\"{{ project.name }}\" ng-repeat=\"project in vm.projects\" ng-bind=\"project.name\"></option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for = \"response\" class = \"col-sm-2 control-label\">Response:</label>\n        <div class=\"col-sm-10\">\n          <div ng-jsoneditor ng-model=\"vm.api.response\" name = 'jsonEditor' options=\"vm.jsonMode\" style=\"width: 100%; height: 300px;\" prefix-text=\"true\"></div>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeCode()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'tree'\">response切换code模式</a>\n          <a  class=\"btn btn-primary\" ng-click=\"vm.setModeTree()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'code'\">response切换tree模式</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"panel-footer\">\n      <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.submit()\">保存</button>\n    </div>\n  </form>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(19);
	__webpack_require__(20);
	var envModalTemplate = __webpack_require__(22);
	
	var urlItemCtrl = (function () {
	  _createClass(urlItemCtrl, null, [{
	    key: '$inject',
	    get: function get() {
	      return ['projectService', 'typeService', '$routeParams', 'DialogService'];
	    }
	  }]);
	
	  function urlItemCtrl(projectService, typeService, $routeParams, DialogService) {
	    _classCallCheck(this, urlItemCtrl);
	
	    this.services = { projectService: projectService, typeService: typeService, $routeParams: $routeParams, DialogService: DialogService };
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
	    key: 'addEnv',
	    value: function addEnv() {
	      var _services = this.services;
	      var DialogService = _services.DialogService;
	      var typeService = _services.typeService;
	
	      DialogService.show({
	        templateUrl: envModalTemplate,
	        controller: function controller() {
	          var _this = this;
	
	          this.hide = function () {
	            _this.$dialog.hide();
	          };
	
	          this.submit = function () {
	            typeService.save(JSON.stringify(_this.env)).$promise.then(function () {
	              _this.$dialog.hide();
	            });
	          };
	        },
	        controllerAs: 'modal'
	      });
	    }
	  }, {
	    key: 'fetchProjects',
	    value: function fetchProjects() {
	      var _this2 = this;
	
	      var projectService = this.services.projectService;
	
	      projectService.query({}).$promise.then(function (data) {
	        _this2.projects = data;
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
/* 19 */
/***/ function(module, exports) {

	var path = '/app/urlDetail/url.html';
	var html = "<div class=\"panel panel-default\">\n  <div class=\"panel-body form-horizontal\">\n    <div class=\"form-group\">\n      <label for=\"url\" class=\"col-sm-2 control-label\">Url</label>\n      <div class=\"col-sm-10\">\n        <input id=\"url\" type=\"text\" ng-model=\"vm.postData.url\" class=\"form-control\">\n      </div>\n    </div>\n\n    <div class=\"form-group\" ng-init=\"vm.fetchProjects()\">\n      <label for=\"method\" class=\"col-sm-2 control-label\">Project</label>\n      <div class=\"col-sm-10\">\n        <select id=\"method\" ng-model=\"vm.postData.project\" class=\"form-control\">\n          <option value=\"{{ project.name }}\" ng-repeat=\"project in vm.projects\" ng-bind=\"project.name\"></option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">Environment</label>\n      <div class=\"col-sm-10\">\n        <button class=\"btn btn-sm btn-default\" ng-click=\"vm.addEnv()\"> <span class=\"glyphicon glyphicon-plus\"></span></button>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">API:</label>\n      <div class=\"col-sm-10\">\n        <button class=\"btn btn-info\" ng-class=\"{'active': api === vm.postData.api }\" ng-repeat=\"api in vm.apis\" ng-bind=\"api.name\" ng-click=\"vm.choose(api)\"></button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel-footer\">\n    <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.submit()\">保存数据</button>\n  </div>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	var path = '/app/components/modal/envModal.html';
	var html = "<div class=\"modal in\" role=\"dialog\" style=\"display: block; padding-right: 15px; background-color: rgba(0, 0, 0, .5)\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title\"  ng-bind=\"'给项目' + modal.env.project + '添加新的环境'\"></h4>\n      </div>\n      <div class=\"modal-body\">\n        <form class=\"form-horizontal\" novalidate>\n          <div class=\"form-group\">\n            <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n            <div class=\"col-sm-10\">\n              <input id=\"name\" type=\"text\" ng-model=\"modal.env.name\" class=\"form-control\">\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"host\" class=\"col-sm-2 control-label\">Host</label>\n            <div class=\"col-sm-10\">\n              <input id=\"host\" type=\"text\" ng-model=\"modal.env.host\" class=\"form-control\" placeholder=\"127.0.0.1:633211\">\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"modal.submit()\">创建新环境</button>\n        <button type=\"button\" ng-click=\"modal.hide()\" class=\"btn btn-default\">取消</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(63);
	
	var _componentsModalEnvModalHtml = __webpack_require__(22);
	
	var _componentsModalEnvModalHtml2 = _interopRequireDefault(_componentsModalEnvModalHtml);
	
	var _servicesUtil = __webpack_require__(64);
	
	var _servicesUtil2 = _interopRequireDefault(_servicesUtil);
	
	var projectCtrl = (function () {
	  _createClass(projectCtrl, null, [{
	    key: '$inject',
	
	    //注入顺序和初始化顺序
	    get: function get() {
	      return ['projectService', 'urlService', 'typeService', '$location', '$routeParams', '$rootScope', '$http', 'DialogService'];
	    }
	  }]);
	
	  function projectCtrl(projectService, urlService, typeService, $location, $routeParams, $rootScope, $http, DialogService) {
	    _classCallCheck(this, projectCtrl);
	
	    this.services = { $location: $location, projectService: projectService, urlService: urlService, typeService: typeService, $rootScope: $rootScope, $http: $http, $routeParams: $routeParams, DialogService: DialogService };
	    this.name = $routeParams.project;
	    this.api = JSON.parse(localStorage.getItem('projectApiItem'));
	    this.jsonMode = { mode: 'tree' };
	    this.env = {
	      project: this.name,
	      name: 'iron-mock',
	      host: '127.0.0.1:8000'
	    };
	    this.envs = [this.env];
	  }
	
	  _createClass(projectCtrl, [{
	    key: 'getUrlApis',
	    value: function getUrlApis() {
	      var _this = this;
	
	      var _services = this.services;
	      var urlService = _services.urlService;
	      var $routeParams = _services.$routeParams;
	
	      urlService.query({ name: '-' + $routeParams.name }).$promise.then(function (data) {
	        _this.apis = data;
	      });
	    }
	  }, {
	    key: 'choose',
	    value: function choose(api) {
	      var _this2 = this;
	
	      var projectService = this.services.projectService;
	
	      projectService.save({ name: this.name }, JSON.stringify(api)).$promise.then(function () {
	        swal({
	          title: '切换成功!',
	          text: '项目' + _this2.name + '已经成功切换' + api.name,
	          type: 'success',
	          confirmButtonText: '知道了!'
	        });
	      })['catch'](_servicesUtil2['default'].commonError);
	    }
	  }, {
	    key: 'addEnv',
	    value: function addEnv() {
	      var self = this;
	
	      var _services2 = this.services;
	      var DialogService = _services2.DialogService;
	      var typeService = _services2.typeService;
	
	      DialogService.show({
	        templateUrl: _componentsModalEnvModalHtml2['default'],
	        controller: function controller() {
	          var _this3 = this;
	
	          this.hide = function () {
	            _this3.$dialog.hide();
	          };
	          this.env = { project: self.name };
	          this.submit = function () {
	            typeService.save(JSON.stringify(_this3.env)).$promise.then(function (data) {
	              self.envs.push(_this3.env);
	              _this3.$dialog.hide();
	            })['catch'](function (e) {
	              _this3.$dialog.hide();
	              _servicesUtil2['default'].commonError(e);
	            });
	          };
	        },
	        controllerAs: 'modal'
	      });
	    }
	  }, {
	    key: 'changeEnv',
	    value: function changeEnv() {
	      var typeService = this.services.typeService;
	
	      typeService.save({ name: this.env.name }, { type: this.env, api: this.api }).$promise.then(function () {
	        swal({
	          title: '更新成功!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        });
	      })['catch'](function (e) {
	        swal({
	          title: '出错了!',
	          text: '启动mock服务器才能切换环境！',
	          type: 'error',
	          confirmButtonText: '去启动'
	        });
	      });
	    }
	  }, {
	    key: 'fetchEnvs',
	    value: function fetchEnvs() {
	      var _this4 = this;
	
	      var typeService = this.services.typeService;
	
	      typeService.query({ name: this.name }).$promise.then(function (envs) {
	        var _envs;
	
	        (_envs = _this4.envs).push.apply(_envs, _toConsumableArray(envs));
	        envs.some(function (env) {
	          var isExist = env.urls.filter(function (url) {
	            return url === _this4.api.url;
	          });
	          if (isExist.length > 0) return _this4.env = env;
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var projectService = this.services.projectService;
	
	      projectService.update({ name: this.name }, JSON.stringify(this.api)).$promise.then(function () {
	        swal({
	          title: '更新成功!',
	          type: 'success',
	          confirmButtonText: '知道了!'
	        });
	      })['catch'](_servicesUtil2['default'].commonError);
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
	
	exports['default'] = {
	  templateUrl: '/app/projectDetail/project.html',
	  controller: projectCtrl,
	  controllerAs: 'vm'
	};
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(25);
	
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
	
	exports['default'] = {
	  templateUrl: '/app/index/index.html',
	  controller: orderCtrl,
	  controllerAs: 'vm'
	};
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	var path = '/app/index/index.html';
	var html = "<p>这里是首页</p>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ function(module, exports) {

	var path = '/app/projectDetail/project.html';
	var html = "<div class=\"panel panel-default\" ng-init=\"vm.getUrlApis()\">\n  <div class=\"panel-heading\">\n    <h1 class=\"panel-title text-center\" ng-bind=\"'请求路径: ' + vm.api.url\"></h1>\n  </div>\n  <form class=\"form-horizontal\" novalidate>\n    <div class=\"panel-body\">\n      <div class=\"form-group\">\n        <label for=\"method\" class=\"col-sm-2 control-label\">Method</label>\n        <div class=\"col-sm-10\">\n          <select id=\"method\" ng-model=\"vm.api.method\" class=\"form-control\">\n            <option value=\"get\">GET</option>\n            <option value=\"post\">POST</option>\n            <option value=\"put\">PUT</option>\n            <option value=\"delete\">DELETE</option>\n            <option value=\"patch\">PATCH</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-init=\"vm.fetchEnvs()\">\n        <label class=\"col-sm-2 control-label\">Environment</label>\n        <div class=\"col-sm-10\">\n          <label class=\"radio-inline\" ng-repeat=\"env in vm.envs\">\n            <input type=\"radio\" ng-model=\"vm.env\" ng-value=\"env\">\n            <span ng-bind=\" env.project + '/' + env.name \"></span>\n          </label>\n          <button class=\"btn btn-sm btn-default\" ng-click=\"vm.addEnv()\"> <span class=\"glyphicon glyphicon-plus\"></span></button>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-show = \"vm.env.name === 'iron-mock'\">\n        <label class=\"col-sm-2 control-label\">API</label>\n        <div class=\"col-sm-10\">\n          <button class=\"btn btn-info\" ng-class=\"{'active': api === vm.api }\" ng-repeat=\"api in vm.apis\" ng-bind=\"api.name\" ng-click=\"vm.choose(api)\"></button>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-show = \"vm.env.name === 'iron-mock'\">\n        <label for = \"response\" class = \"col-sm-2 control-label\">Response</label>\n        <div class=\"col-sm-10\">\n          <div ng-jsoneditor ng-model=\"vm.api.response\" options=\"vm.jsonMode\" style=\"width: 100%; height: 300px;\" prefix-text=\"true\"></div>\n          <button type=\"submit\" class=\"btn btn-primary\" style=\"margin-top: 16px;\" ng-click=\"vm.update()\">更新接口</button>\n          <!--<a  class=\"btn btn-primary\" ng-click=\"vm.setModeCode()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'tree'\">response切换code模式</a>-->\n          <!--<a  class=\"btn btn-primary\" ng-click=\"vm.setModeTree()\" style=\"margin-top: 16px;\" ng-if=\"vm.jsonMode.mode === 'code'\">response切换tree模式</a>-->\n        </div>\n      </div>\n      <div class=\"form-group\" ng-if = \"vm.env.name !== 'iron-mock'\">\n        <div class=\"col-sm-offset-2 col-sm-10\">\n          <button class=\"btn btn-primary\" style=\"margin-top: 16px;\" ng-click=\"vm.changeEnv()\">切换{{ vm.env.name }}环境</button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Util = (function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }
	
	  _createClass(Util, null, [{
	    key: 'commonError',
	    value: function commonError(e) {
	      swal({
	        title: '出错了!',
	        text: e.data.message,
	        type: 'error',
	        confirmButtonText: '知道了!'
	      });
	    }
	  }]);
	
	  return Util;
	})();
	
	exports['default'] = Util;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxZjQ5MWRhNTQ1NWIyMjI1MDYiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY3NzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvYXBwLnNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL21vZGFsL21vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvbW9kYWwvcHJvamVjdE1vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvYXBpLmpzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBpRGV0YWlsL2RldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBpRGV0YWlsL2RldGFpbC5odG1sIiwid2VicGFjazovLy8uL2FwcC91cmxEZXRhaWwvdXJsLmpzIiwid2VicGFjazovLy8uL2FwcC91cmxEZXRhaWwvdXJsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL3VybERldGFpbC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvbW9kYWwvZW52TW9kYWwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFpQjs7cUJBQ2pCLENBQXlCOztxQkFDekIsQ0FBNkI7O3FCQUM3QixFQUFPOztrQ0FFSSxFQUFTOzs7O0FBRTNCLFFBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQ3BCLFNBQVMsRUFDVCxZQUFZLEVBQ1osYUFBYSxFQUNiLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixZQUFZLENBQ2IsQ0FBQyxDQUNELE1BQU0saUJBQWdCLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBUyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUU7OztBQUczTCxXQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLFFBQVEsRUFBRTs7O0FBRy9ELFNBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1NBQ3RDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztTQUN0QyxZQUFZLEdBQUcsRUFBRSxDQUFDOztBQUVwQixhQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQ25DLFdBQUksS0FBSyxLQUFLLE9BQU8sSUFBSSxJQUFJLElBQUks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O1VBUkcsSUFBSTs7O3NCQVdLLElBQUkiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NzFmNDkxZGE1NDU1YjIyMjUwNlxuICoqLyIsImltcG9ydCAnLi9jc3Mvc3R5bGUuY3NzJztcbmltcG9ydCAnLi9zZXJ2aWNlcy9hcHAuc2VydmljZXMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMnO1xuaW1wb3J0ICcuL2FwaSc7XG5cbmltcG9ydCBSb3V0ZSBmcm9tICcuL3JvdXRlJztcblxuYW5ndWxhci5tb2R1bGUoJ2VsZW1lJywgW1xuICAgICduZ1JvdXRlJyxcbiAgICAnbmdSZXNvdXJjZScsXG4gICAgJ2llOHByb3ZpZGVyJyxcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAnbmcuanNvbmVkaXRvcicsXG4gICAgJ2VsZW1lLnNlcnZpY2VzJyxcbiAgICAnZWxlbWUuZGlyZWN0aXZlcycsXG4gICAgJ2VsZW1lLmFwaXMnXG4gIF0pXG4gIC5jb25maWcoLyogQG5nSW5qZWN0ICovW1wiJHJvdXRlUHJvdmlkZXJcIiwgXCIkbG9jYXRpb25Qcm92aWRlclwiLCBcIiRwcm92aWRlXCIsIFwiaWU4UHJvdmlkZXJcIiwgXCIkaHR0cFByb3ZpZGVyXCIsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHByb3ZpZGUsIGllOFByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XG4gICAgLy8g5L+u5aSNIElFIOS4rSBFdmVudDppbnB1dCDnmoQgYnVnXG4gICAgLy8gcmVmZXJlbmNlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLmpzL2Jsb2IvdjEuMy54L3NyYy9uZy9zbmlmZmVyLmpzXG4gICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckc25pZmZlcicsIFsnJGRlbGVnYXRlJywgZnVuY3Rpb24gKCRzbmlmZmVyKSB7XG4gICAgICAvLyBkb2N1bWVudE1vZGUg5pivIElFIOeLrOacieaWueazlVxuICAgICAgLy8gcmVmZXJlbmNlOiBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2NjMTk2OTg4KHY9dnMuODUpLmFzcHhcbiAgICAgIHZhciBtc2llID0gTnVtYmVyKGRvY3VtZW50LmRvY3VtZW50TW9kZSksXG4gICAgICAgIGRpdkVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBldmVudFN1cHBvcnQgPSB7fTtcblxuICAgICAgJHNuaWZmZXIuaGFzRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnaW5wdXQnICYmIG1zaWUgPD0gMTEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChldmVudFN1cHBvcnRbZXZlbnRdKSkge1xuICAgICAgICAgIGV2ZW50U3VwcG9ydFtldmVudF0gPSAoJ29uJyArIGV2ZW50KSBpbiBkaXZFbG07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXZlbnRTdXBwb3J0W2V2ZW50XTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gJHNuaWZmZXI7XG4gICAgfV0pO1xuICB9XSlcbiAgLmNvbmZpZyhSb3V0ZSlcbiAgLnJ1bigvKiBuZ0luamVjdCAqL1tcIiRyb290U2NvcGVcIiwgXCIkaHR0cFwiLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cCl7XG4gICAgICRyb290U2NvcGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICRodHRwLmdldCgnL3Jlc3RhcGkvc3RhcnQnKVxuICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICB0aXRsZTogJ21vY2sgc2VydmVyIOWcqDgwMDDnq6/lj6PlkK/liqghJyxcbiAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5ZCv5YqobW9jayBzZXJ2ZXLlh7rplJnkuoYhJyxcbiAgICAgICAgICAgICAgdGV4dDogZS5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICflnKjor5XkuIDmrKEnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgfVxuICB9XSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwcC5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jc3Mvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IERpYWxvZyBmcm9tICcuL2RpYWxvZyc7XG5cbmFuZ3VsYXIubW9kdWxlKCdlbGVtZS5zZXJ2aWNlcycsIFtdKVxuICAuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIFsnJGh0dHAnLCAnJHJvb3RTY29wZScsICckY29udHJvbGxlcicsICckY29tcGlsZScsICckcScsICckdGVtcGxhdGVSZXF1ZXN0JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgJGNvbXBpbGUsICRxLCAkdGVtcGxhdGVSZXF1ZXN0KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBEaWFsb2coeyAkaHR0cCwgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsICRjb21waWxlLCAkcSwgJHRlbXBsYXRlUmVxdWVzdCB9KTtcbiAgfV0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9zZXJ2aWNlcy9hcHAuc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBEaWFsb2cge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlcykge1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgfVxuXG4gIGluaXQoe2NvbnRyb2xsZXIsIGNvbnRyb2xsZXJBcywgc2NvcGV9KSB7XG4gICAgdmFyIHsgJGNvbnRyb2xsZXIgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGN0cmwgPSAkY29udHJvbGxlcihjb250cm9sbGVyLCB7IHNjb3BlIH0pO1xuXG4gICAgdmFyIGRpYWxvZyA9IHtcbiAgICAgIGNvbnRyb2xsZXI6IGN0cmwsXG4gICAgICBzY29wZSxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgIGhpZGU6IHRoaXMuaGlkZS5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIGN0cmwuJGRpYWxvZyA9IGRpYWxvZztcbiAgICBpZiAoY29udHJvbGxlckFzKSBzY29wZVtjb250cm9sbGVyQXNdID0gY3RybDtcblxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cblxuICBzaG93KHsgcGFyZW50RWxlbWVudCwgdGVtcGxhdGUsIHRlbXBsYXRlVXJsLCBjb250cm9sbGVyLCBjb250cm9sbGVyQXMgfSkge1xuICAgIHZhciB7ICRjb21waWxlLCAkcm9vdFNjb3BlIH0gPSB0aGlzLnNlcnZpY2VzO1xuICAgIHZhciBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuXG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hUZW1wbGF0ZSh7IHRlbXBsYXRlLCB0ZW1wbGF0ZVVybCB9KVxuICAgICAgLnRoZW4ocmF3ID0+IHtcbiAgICAgICAgdmFyIGxpbmtGbiA9ICRjb21waWxlKHJhdyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbGlua0ZuKHNjb3BlKTtcblxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50WzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnRbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmluaXQoeyBjb250cm9sbGVyLCBjb250cm9sbGVyQXMsIHNjb3BlIH0pKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50WzBdKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaFRlbXBsYXRlKHt0ZW1wbGF0ZSwgdGVtcGxhdGVVcmx9KSB7XG4gICAgdmFyIHsgJHEsICR0ZW1wbGF0ZVJlcXVlc3QgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVVybCkge1xuICAgICAgJHRlbXBsYXRlUmVxdWVzdCh0ZW1wbGF0ZVVybCkudGhlbihkZWZlcnJlZC5yZXNvbHZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmZXJyZWQucmVqZWN0KCdObyBzcGVjaWZ5IHRlbXBsYXRlIG9yIHRlbXBsYXRlVXJsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvc2VydmljZXMvZGlhbG9nLmpzXG4gKiovIiwiaW1wb3J0IGFzaWRlIGZyb20gJy4vYXNpZGUvYXNpZGUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnZWxlbWUuZGlyZWN0aXZlcycsIFtdKVxuICAuZGlyZWN0aXZlKCdlbGVtZUFzaWRlJywgYXNpZGUpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvY29tcG9uZW50cy9hcHAuZGlyZWN0aXZlcy5qc1xuICoqLyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgbW9kYWxUZW1wbGF0ZSBmcm9tICcuLy4uL21vZGFsL21vZGFsLmh0bWwnO1xuaW1wb3J0IHByb2plY3RUZW1wbGF0ZSBmcm9tICcuLy4uL21vZGFsL3Byb2plY3RNb2RhbC5odG1sJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2FzaWRlLmh0bWwnO1xuXG5mdW5jdGlvbiAvKiBAbmdJbmplY3QgKi9hc2lkZShEaWFsb2dTZXJ2aWNlLCBhcGlTZXJ2aWNlLCB1cmxTZXJ2aWNlLCBwcm9qZWN0U2VydmljZSwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlLCAkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHNjb3BlOntcblxuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6IHRlbXBsYXRlLFxuICAgIGxpbms6ICgkc2NvcGUpID0+IHtcbiAgICAgICRzY29wZS5xdWVyeUFwaSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAnYXBpJztcbiAgICAgICAgYXBpU2VydmljZS5xdWVyeSh7fSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihhcGlzKSB7XG4gICAgICAgICAgICAkc2NvcGUuYXBpcyA9IGFwaXM7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgJHNjb3BlLnF1ZXJ5QXBpKCk7XG4gICAgICAkc2NvcGUucXVlcnlVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHJvb3RTY29wZS50eXBlID0gJ3VybCc7XG4gICAgICAgIHVybFNlcnZpY2UucXVlcnkoe30pXG4gICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgJHNjb3BlLnVybHMgPSBkYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLnF1ZXJ5UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAncHJvamVjdCc7XG4gICAgICAgIHByb2plY3RTZXJ2aWNlLnF1ZXJ5KHt9KVxuICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgJHNjb3BlLnByb2plY3RzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuYWRkQXBpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIERpYWxvZ1NlcnZpY2Uuc2hvdyh7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6IG1vZGFsVGVtcGxhdGUsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgYXBpU2VydmljZS5zYXZlKEpTT04uc3RyaW5naWZ5KHRoaXMuYXBpKSlcbiAgICAgICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmFwaXMudW5zaGlmdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ21vZGFsJ1xuICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmFkZFByb2plY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgRGlhbG9nU2VydmljZS5zaG93KHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogcHJvamVjdFRlbXBsYXRlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlID0gKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRkaWFsb2cuaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgcHJvamVjdFNlcnZpY2Uuc2F2ZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3QpKVxuICAgICAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUucHJvamVjdHMudW5zaGlmdChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnbW9kYWwnXG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuZ29BcGkgPSBmdW5jdGlvbihhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwaUl0ZW0nLCBKU09OLnN0cmluZ2lmeShhcGkpKTtcbiAgICAgICAgJHJvb3RTY29wZS50eXBlID0gJ2FwaSc7XG4gICAgICAgICRsb2NhdGlvbi51cmwoYC9hcGlzLyR7YXBpLm5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1Byb2plY3RBcGkgPSBmdW5jdGlvbihuYW1lLCBhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcGlJdGVtJywgSlNPTi5zdHJpbmdpZnkoYXBpKSk7XG4gICAgICAgIHZhciB1cmxOYW1lID0gYXBpLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3Byb2plY3RzLyR7bmFtZX0vYXBpcy8ke3VybE5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1VybCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHVybE5hbWUgPSBkYXRhLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1cmxJdGVtJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAndXJsJztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3VybHMvJHt1cmxOYW1lfWApO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZUFwaSA9IGZ1bmN0aW9uKGFwaSwgaW5kZXgpIHtcbiAgICAgICAgYXBpU2VydmljZS5yZW1vdmUoe25hbWU6IGFwaS5uYW1lfSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmFwaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZVVybCA9IGZ1bmN0aW9uKHVybCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHVybE5hbWUgPSB1cmwucmVwbGFjZSgvXFwvLywgJycpLnJlcGxhY2UoL1xcLy9nLCAnLScpO1xuICAgICAgICB1cmxTZXJ2aWNlLnJlbW92ZSh7bmFtZTogdXJsTmFtZX0pXG4gICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRzY29wZS51cmxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5kZWxldGVQcm9qZWN0QXBpID0gZnVuY3Rpb24ocGFyZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgcHJvamVjdCA9ICRzY29wZS5wcm9qZWN0c1twYXJlbnRdO1xuICAgICAgICB2YXIgYXBpID0gcHJvamVjdC5kYXRhLmFwaXNbaW5kZXhdO1xuICAgICAgICAkaHR0cC5kZWxldGUoYC9yZXN0YXBpL3Byb2plY3RzLyR7cHJvamVjdC5uYW1lfT91cmw9JHthcGkudXJsfWApXG4gICAgICAgICAgLnN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5kYXRhLmFwaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqGIScsXG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc2lkZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9hc2lkZS9zdHlsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwibW9kYWwgaW5cXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6IGJsb2NrOyBwYWRkaW5nLXJpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+5re75Yqg5paw55qE6K+35rGCPC9oND5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj5cXG4gICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcImFwaU5hbWVcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5OYW1lPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJhcGlOYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibW9kYWwuYXBpLm5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwidXJsXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+VXJsPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJ1cmxcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJtb2RhbC5hcGkudXJsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcIm1ldGhvZFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPk1ldGhvZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcIm1ldGhvZFxcXCIgbmctbW9kZWw9XFxcIm1vZGFsLmFwaS5tZXRob2RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJnZXRcXFwiPkdFVDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwb3N0XFxcIj5QT1NUPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInB1dFxcXCI+UFVUPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImRlbGV0ZVxcXCI+REVMRVRFPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInBhdGNoXFxcIj5QQVRDSDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLmhpZGUoKVxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+5Y+W5raIPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLnN1Ym1pdCgpXFxcIj7liJvlu7phcGk8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwYXRoID0gJy9hcHAvY29tcG9uZW50cy9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwibW9kYWwgaW5cXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6IGJsb2NrOyBwYWRkaW5nLXJpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+5re75Yqg5paw6aG555uuPC9oND5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj5cXG4gICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcIm5hbWVcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5uYW1lPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibW9kYWwucHJvamVjdC5uYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcImhvc3RuYW1lXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+aG9zdG5hbWU8L2xhYmVsPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImhvc3RuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibW9kYWwucHJvamVjdC5ob3N0bmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLmhpZGUoKVxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+5Y+W5raIPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLnN1Ym1pdCgpXFxcIj7liJvlu7rpobnnm648L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGFzaWRlPlxcbiAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2LXRhYnNcXFwiIG5nLWluaXQ9XFxcInF1ZXJ5QXBpKClcXFwiPlxcbiAgICA8bGkgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ2FwaSd9XFxcIj48YSBocmVmPVxcXCJKYXZhc2NyaXB0OjtcXFwiIG5nLWNsaWNrPVxcXCJxdWVyeUFwaSgpXFxcIj7or7fmsYLliJfooag8L2E+PC9saT5cXG4gICAgPGxpIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6ICRyb290LnR5cGUgPT09ICdwcm9qZWN0J31cXFwiPjxhIGhyZWY9XFxcIkphdmFzY3JpcHQ6O1xcXCIgbmctY2xpY2s9XFxcInF1ZXJ5UHJvamVjdCgpXFxcIj7pobnnm67liJfooag8L2E+PC9saT5cXG4gIDwvdWw+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi1wYW5lXFxcIiBuZy1jbGFzcz1cXFwieydhY3RpdmUnOiAkcm9vdC50eXBlID09PSAnYXBpJ31cXFwiPlxcbiAgICAgIDxpbnB1dCB0eXBlID0gXFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCLmkJzntKJhcGlcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgZm9ybS1zZWFyY2hcXFwiIG5nLW1vZGVsPVxcXCJhcGlTZWFyY2hcXFwiPlxcbiAgICAgIDx1bCBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSBjbGVhcmZpeFxcXCIgbmctcmVwZWF0PVxcXCJhcGkgaW4gYXBpcyB8IGZpbHRlcjogYXBpU2VhcmNoXFxcIj5cXG4gICAgICAgICAgPHNwYW4gbmctYmluZD1cXFwiYXBpLm5hbWVcXFwiIGNsYXNzPVxcXCJwdWxsLWxlZnRcXFwiIG5nLWNsaWNrPVxcXCJnb0FwaShhcGkpXFxcIj48L3NwYW4+XFxuICAgICAgICAgIDxhIGhyZWYgPSBcXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcyA9IFxcXCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0IGJ0bi1zbVxcXCIgbmctY2xpY2s9XFxcImRlbGV0ZUFwaShhcGksICRpbmRleClcXFwiPuWIoOmZpDwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG5cXG4gICAgICA8Zm9vdGVyPjxhIGhyZWY9XFxcIkphdmFzY3JpcHQ6O1xcXCIgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIiBuZy1jbGljaz1cXFwiYWRkQXBpKClcXFwiPjxpIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcXFwiPjwvaT48L2E+PC9mb290ZXI+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZVxcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ3Byb2plY3QnfVxcXCI+XFxuICAgICAgPHVpYi1hY2NvcmRpb24+XFxuICAgICAgICA8dWliLWFjY29yZGlvbi1ncm91cCBpcy1vcGVuPVxcXCJvcGVuXFxcIiBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gcHJvamVjdHNcXFwiPlxcbiAgICAgICAgICA8dWliLWFjY29yZGlvbi1oZWFkaW5nPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJnbHlwaGljb25cXFwiIG5nLWNsYXNzPVxcXCJ7J2dseXBoaWNvbi1mb2xkZXItb3Blbic6IG9wZW4sICdnbHlwaGljb24tZm9sZGVyLWNsb3NlJzogIW9wZW59XFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4gbmctYmluZD1cXFwicHJvamVjdC5uYW1lXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcInB1bGwtcmlnaHQgZ2x5cGhpY29uXFxcIiBuZy1jbGFzcz1cXFwieydnbHlwaGljb24tY2hldnJvbi1kb3duJzogb3BlbiwgJ2dseXBoaWNvbi1jaGV2cm9uLXJpZ2h0JzogIW9wZW59XFxcIj48L2k+XFxuICAgICAgICAgIDwvdWliLWFjY29yZGlvbi1oZWFkaW5nPlxcbiAgICAgICAgICA8ZGl2IG5nLWlmPVxcXCJwcm9qZWN0LmRhdGEuYXBpcy5sZW5ndGggPD0gMFxcXCIgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICA8cD7or6Xpobnnm67ov5jmsqHmnInmt7vliqDot6/nlLHotbbntKfljrvmt7vliqDlkKchPC9wPlxcbiAgICAgICAgICAgIDxhIG5nLWNsaWNrPVxcXCJxdWVyeVVybCgpXFxcIiBjbGFzcyA9IFxcXCJidG4gYnRuLWRhbmdlclxcXCI+5Y675re75Yqg5o6l5Y+jPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPHVsIGNsYXNzPVxcXCJsaW5rLWxpc3RcXFwiIG5nLWlmPVxcXCJwcm9qZWN0LmRhdGEgJiYgcHJvamVjdC5kYXRhLmFwaXMubGVuZ3RoID4gMFxcXCI+XFxuICAgICAgICAgICAgPGxpIG5nLXJlcGVhdD1cXFwiYXBpIGluIHByb2plY3QuZGF0YS5hcGlzIHRyYWNrIGJ5ICRpbmRleFxcXCIgY2xhc3M9XFxcImNsZWFyZml4XFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0ZXh0LXByaW1hcnkgdGV4dC1saW5rIHB1bGwtbGVmdFxcXCIgbmctYmluZD1cXFwiYXBpLnVybFxcXCIgbmctY2xpY2s9XFxcImdvUHJvamVjdEFwaShwcm9qZWN0Lm5hbWUsIGFwaSlcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgIDxhIGhyZWYgPSBcXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcyA9IFxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoIHB1bGwtcmlnaHQgdGV4dC1kYW5nZXJcXFwiIG5nLWNsaWNrPVxcXCJkZWxldGVQcm9qZWN0QXBpKCRwYXJlbnQuJGluZGV4LCAkaW5kZXgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogOHB4O1xcXCI+PC9hPlxcbiAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L3VpYi1hY2NvcmRpb24tZ3JvdXA+XFxuICAgICAgPC91aWItYWNjb3JkaW9uPlxcblxcbiAgICAgIDxmb290ZXI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiIG5nLWNsaWNrPVxcXCJhZGRQcm9qZWN0KClcXFwiPjxpIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcXFwiPjwvaT48L2E+PC9mb290ZXI+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9hc2lkZT5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9hc2lkZS9hc2lkZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImFuZ3VsYXIubW9kdWxlKCdlbGVtZS5hcGlzJywgW10pXG4gIC5mYWN0b3J5KCdhcGlTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvYXBpcy86bmFtZScsIHtuYW1lIDogJ0BuYW1lJ30sIHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCd1cmxTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvdXJscy86bmFtZScsIHtuYW1lIDogJ0BuYW1lJ30sIHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG4gIC5mYWN0b3J5KCdwcm9qZWN0U2VydmljZScsLyogQG5nSW5qZWN0ICovKCRyZXNvdXJjZSkgPT4ge1xuICAgIHJldHVybiAkcmVzb3VyY2UoJy9yZXN0YXBpL3Byb2plY3RzLzpuYW1lJywge25hbWUgOiAnQG5hbWUnfSwge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ3R5cGVTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvdHlwZXMvOm5hbWUnLCB7bmFtZSA6ICdAbmFtZSd9LCB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwaS5qc1xuICoqLyIsImltcG9ydCBhcGlEZXRhaWwgZnJvbSAnLi9hcGlEZXRhaWwvZGV0YWlsJztcbmltcG9ydCB1cmxEZXRhaWwgZnJvbSAnLi91cmxEZXRhaWwvdXJsJztcbmltcG9ydCBwcm9qZWN0RGV0YWlsIGZyb20gJy4vcHJvamVjdERldGFpbC9wcm9qZWN0JztcbmltcG9ydCBIb21lIGZyb20gJy4vaW5kZXgvaW5kZXgnO1xuXG5jb25zdCByb3V0ZUNvbmZpZyA9IFtcbiAgWycvJywgSG9tZV0sXG4gIFsnL2FwaXMvOm5hbWUnLCBhcGlEZXRhaWxdLFxuICBbJy91cmxzLzpuYW1lJywgdXJsRGV0YWlsXSxcbiAgWycvcHJvamVjdHMvOnByb2plY3QvYXBpcy86bmFtZScsIHByb2plY3REZXRhaWxdXG5dO1xuXG5jb25zdCBjb25maWcgPSAgLyogQG5nSW5qZWN0ICovW1wiJHJvdXRlUHJvdmlkZXJcIiwgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgcm91dGVDb25maWcuZm9yRWFjaChmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbihjb25maWdbMF0sIGNvbmZpZ1sxXSk7XG4gIH0pO1xuXG4gICRyb3V0ZVByb3ZpZGVyLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvNDA0JyB9KTtcbn1dO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9yb3V0ZS5qc1xuICoqLyIsImltcG9ydCAnLi9kZXRhaWwuaHRtbCc7XG5cbmNsYXNzIGFwaUl0ZW1DdHJsIHtcbiAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgIHJldHVybiBbICdhcGlTZXJ2aWNlJywgJ3Byb2plY3RTZXJ2aWNlJywgJyRsb2NhdGlvbicsICckc2NvcGUnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCBhcGlTZXJ2aWNlLCBwcm9qZWN0U2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUgKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHsgYXBpU2VydmljZSwgcHJvamVjdFNlcnZpY2UsICRsb2NhdGlvbiwgJHNjb3BlIH07XG4gICAgdGhpcy5hcGkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcGlJdGVtJykpO1xuICAgIHRoaXMuanNvbk1vZGUgPSB7bW9kZTogJ3RyZWUnfTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB2YXIgeyBhcGlTZXJ2aWNlLCBwcm9qZWN0U2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGRhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy5hcGkpO1xuXG4gICAgYXBpU2VydmljZS5zYXZlKHtuYW1lOiB0aGlzLmFwaS5uYW1lfSwgZGF0YSlcbiAgICAgIC4kcHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvamVjdFNlcnZpY2Uuc2F2ZSh7bmFtZTogdGhpcy5wcm9qZWN0TmFtZX0sIHtuYW1lOiB0aGlzLmFwaS5uYW1lfSkuJHByb21pc2VcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICB0ZXh0OiAn5o6l5Y+j5pu05paw5oiQ5YqfIei1tue0p+mHjeWQr21vY2sgc2VydmVy5ZCnIScsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgfSwgKGlzQ29uZmlybSkgPT4ge1xuICAgICAgICAgICRsb2NhdGlvbi51cmwoJy8nKTtcbiAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgICAgIHRleHQ6IGUubWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBzZXRNb2RlQ29kZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAnY29kZSc7XG4gIH1cblxuICBmZXRjaFByb2plY3RzKCkge1xuICAgIHZhciB7IHByb2plY3RTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuXG4gICAgcHJvamVjdFNlcnZpY2UucXVlcnkoe30pXG4gICAgICAuJHByb21pc2VcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBkYXRhO1xuICAgICAgfSk7XG4gIH1cblxuICBzZXRNb2RlVHJlZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAndHJlZSc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZW1wbGF0ZVVybDogJy9hcHAvYXBpRGV0YWlsL2RldGFpbC5odG1sJyxcbiAgY29udHJvbGxlcjogYXBpSXRlbUN0cmwsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwaURldGFpbC9kZXRhaWwuanNcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2FwaURldGFpbC9kZXRhaWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCIgbmctaW5pdD1cXFwidm0uZ2V0QXBpKClcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgIDxoMSBjbGFzcz1cXFwicGFuZWwtdGl0bGUgdGV4dC1jZW50ZXJcXFwiIG5nLWJpbmQ9XFxcIifmjqXlj6PlkI3np7AnICsgdm0uYXBpLm5hbWVcXFwiIG5nLWlmPVxcXCJ2bS5hcGkubmFtZVxcXCI+PC9oMT5cXG4gIDwvZGl2PlxcbiAgPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCIgbm92YWxpZGF0ZT5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJ1cmxcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5Vcmw8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGlucHV0IGlkPVxcXCJ1cmxcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ2bS5hcGkudXJsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwibWV0aG9kXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+TWV0aG9kPC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcIm1ldGhvZFxcXCIgbmctbW9kZWw9XFxcInZtLmFwaS5tZXRob2RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImdldFxcXCI+R0VUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicG9zdFxcXCI+UE9TVDwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInB1dFxcXCI+UFVUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZGVsZXRlXFxcIj5ERUxFVEU8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwYXRjaFxcXCI+UEFUQ0g8L29wdGlvbj5cXG4gICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1pbml0PVxcXCJ2bS5mZXRjaFByb2plY3RzKClcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwibWV0aG9kXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+UHJvamVjdDwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJtZXRob2RcXFwiIG5nLW1vZGVsPVxcXCJ2bS5wcm9qZWN0TmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwie3sgcHJvamVjdC5uYW1lIH19XFxcIiBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gdm0ucHJvamVjdHNcXFwiIG5nLWJpbmQ9XFxcInByb2plY3QubmFtZVxcXCI+PC9vcHRpb24+XFxuICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yID0gXFxcInJlc3BvbnNlXFxcIiBjbGFzcyA9IFxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5SZXNwb25zZTo8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGRpdiBuZy1qc29uZWRpdG9yIG5nLW1vZGVsPVxcXCJ2bS5hcGkucmVzcG9uc2VcXFwiIG5hbWUgPSAnanNvbkVkaXRvcicgb3B0aW9ucz1cXFwidm0uanNvbk1vZGVcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAzMDBweDtcXFwiIHByZWZpeC10ZXh0PVxcXCJ0cnVlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPGEgIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zZXRNb2RlQ29kZSgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMTZweDtcXFwiIG5nLWlmPVxcXCJ2bS5qc29uTW9kZS5tb2RlID09PSAndHJlZSdcXFwiPnJlc3BvbnNl5YiH5o2iY29kZeaooeW8jzwvYT5cXG4gICAgICAgICAgPGEgIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zZXRNb2RlVHJlZSgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMTZweDtcXFwiIG5nLWlmPVxcXCJ2bS5qc29uTW9kZS5tb2RlID09PSAnY29kZSdcXFwiPnJlc3BvbnNl5YiH5o2idHJlZeaooeW8jzwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnN1Ym1pdCgpXFxcIj7kv53lrZg8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Zvcm0+XFxuPC9kaXY+XCI7XG53aW5kb3cuYW5ndWxhci5tb2R1bGUoJ25nJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbihjKSB7IGMucHV0KHBhdGgsIGh0bWwpIH1dKTtcbm1vZHVsZS5leHBvcnRzID0gcGF0aDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2FwaURldGFpbC9kZXRhaWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL3VybC5odG1sJyk7XG5yZXF1aXJlKCcuL3N0eWxlLmNzcycpO1xudmFyIGVudk1vZGFsVGVtcGxhdGUgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudHMvbW9kYWwvZW52TW9kYWwuaHRtbCcpO1xuXG5jbGFzcyB1cmxJdGVtQ3RybCB7XG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gWyAncHJvamVjdFNlcnZpY2UnLCd0eXBlU2VydmljZScsICckcm91dGVQYXJhbXMnLCAnRGlhbG9nU2VydmljZSddO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvamVjdFNlcnZpY2UsIHR5cGVTZXJ2aWNlLCAkcm91dGVQYXJhbXMsIERpYWxvZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0geyBwcm9qZWN0U2VydmljZSwgdHlwZVNlcnZpY2UsICRyb3V0ZVBhcmFtcywgRGlhbG9nU2VydmljZSB9O1xuICAgIHZhciB1cmxJdGVtID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXJsSXRlbScpKTtcbiAgICB0aGlzLmFwaXMgPSB1cmxJdGVtLmRhdGE7XG4gICAgdGhpcy5wb3N0RGF0YSA9IHtcbiAgICAgIHVybDogdXJsSXRlbS51cmwsXG4gICAgICBwcm9qZWN0OiBudWxsLFxuICAgICAgYXBpOiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2hvb3NlKGFwaSkge1xuICAgIHRoaXMucG9zdERhdGEuYXBpID0gYXBpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIHZhciB7IHByb2plY3RTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuXG4gICAgcHJvamVjdFNlcnZpY2Uuc2F2ZSh7bmFtZTogdGhpcy5wb3N0RGF0YS5wcm9qZWN0fSwgSlNPTi5zdHJpbmdpZnkodGhpcy5wb3N0RGF0YS5hcGkpKVxuICAgICAgLiRwcm9taXNlXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICB0ZXh0OiAn5o6l5Y+j5pu05paw5oiQ5YqfIei1tue0p+mHjeWQr21vY2sgc2VydmVy5ZCnIScsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgdGl0bGU6ICflh7rplJnkuoYhJyxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBhZGRFbnYoKSB7XG4gICAgdmFyIHsgRGlhbG9nU2VydmljZSx0eXBlU2VydmljZSB9ID0gdGhpcy5zZXJ2aWNlcztcbiAgICBEaWFsb2dTZXJ2aWNlLnNob3coe1xuICAgICAgdGVtcGxhdGVVcmw6IGVudk1vZGFsVGVtcGxhdGUsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5oaWRlID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgICAgdHlwZVNlcnZpY2Uuc2F2ZShKU09OLnN0cmluZ2lmeSh0aGlzLmVudikpXG4gICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICdtb2RhbCdcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2hQcm9qZWN0cygpIHtcbiAgICB2YXIgeyBwcm9qZWN0U2VydmljZSB9ID0gdGhpcy5zZXJ2aWNlcztcblxuICAgIHByb2plY3RTZXJ2aWNlLnF1ZXJ5KHt9KVxuICAgICAgLiRwcm9taXNlXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gZGF0YTtcbiAgICAgIH0pO1xuICB9XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGVVcmw6ICcvYXBwL3VybERldGFpbC91cmwuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IHVybEl0ZW1DdHJsLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC91cmxEZXRhaWwvdXJsLmpzXG4gKiovIiwidmFyIHBhdGggPSAnL2FwcC91cmxEZXRhaWwvdXJsLmh0bWwnO1xudmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keSBmb3JtLWhvcml6b250YWxcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICA8bGFiZWwgZm9yPVxcXCJ1cmxcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5Vcmw8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8aW5wdXQgaWQ9XFxcInVybFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInZtLnBvc3REYXRhLnVybFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1pbml0PVxcXCJ2bS5mZXRjaFByb2plY3RzKClcXFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XFxcIm1ldGhvZFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlByb2plY3Q8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8c2VsZWN0IGlkPVxcXCJtZXRob2RcXFwiIG5nLW1vZGVsPVxcXCJ2bS5wb3N0RGF0YS5wcm9qZWN0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwie3sgcHJvamVjdC5uYW1lIH19XFxcIiBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gdm0ucHJvamVjdHNcXFwiIG5nLWJpbmQ9XFxcInByb2plY3QubmFtZVxcXCI+PC9vcHRpb24+XFxuICAgICAgICA8L3NlbGVjdD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+RW52aXJvbm1lbnQ8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XFxcIiBuZy1jbGljaz1cXFwidm0uYWRkRW52KClcXFwiPiA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXFxcIj48L3NwYW4+PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPkFQSTo8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWluZm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6IGFwaSA9PT0gdm0ucG9zdERhdGEuYXBpIH1cXFwiIG5nLXJlcGVhdD1cXFwiYXBpIGluIHZtLmFwaXNcXFwiIG5nLWJpbmQ9XFxcImFwaS5uYW1lXFxcIiBuZy1jbGljaz1cXFwidm0uY2hvb3NlKGFwaSlcXFwiPjwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zdWJtaXQoKVxcXCI+5L+d5a2Y5pWw5o2uPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvdXJsRGV0YWlsL3VybC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC91cmxEZXRhaWwvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwYXRoID0gJy9hcHAvY29tcG9uZW50cy9tb2RhbC9lbnZNb2RhbC5odG1sJztcbnZhciBodG1sID0gXCI8ZGl2IGNsYXNzPVxcXCJtb2RhbCBpblxcXCIgcm9sZT1cXFwiZGlhbG9nXFxcIiBzdHlsZT1cXFwiZGlzcGxheTogYmxvY2s7IHBhZGRpbmctcmlnaHQ6IDE1cHg7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgLjUpXFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlciB0ZXh0LWNlbnRlclxcXCI+XFxuICAgICAgICA8aDQgY2xhc3M9XFxcIm1vZGFsLXRpdGxlXFxcIiAgbmctYmluZD1cXFwiJ+e7memhueebricgKyBtb2RhbC5lbnYucHJvamVjdCArICfmt7vliqDmlrDnmoTnjq/looMnXFxcIj48L2g0PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiPlxcbiAgICAgICAgPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCIgbm92YWxpZGF0ZT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwibmFtZVxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPk5hbWU8L2xhYmVsPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcIm5hbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJtb2RhbC5lbnYubmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJob3N0XFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+SG9zdDwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiaG9zdFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm1vZGFsLmVudi5ob3N0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBwbGFjZWhvbGRlcj1cXFwiMTI3LjAuMC4xOjYzMzIxMVxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLnN1Ym1pdCgpXFxcIj7liJvlu7rmlrDnjq/looM8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1jbGljaz1cXFwibW9kYWwuaGlkZSgpXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj7lj5bmtog8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9tb2RhbC9lbnZNb2RhbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAnLi9wcm9qZWN0Lmh0bWwnO1xuaW1wb3J0IGVudk1vZGFsVGVtcGxhdGUgZnJvbSAnLi8uLi9jb21wb25lbnRzL21vZGFsL2Vudk1vZGFsLmh0bWwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsJztcblxuY2xhc3MgcHJvamVjdEN0cmwge1xuXG4gIC8v5rOo5YWl6aG65bqP5ZKM5Yid5aeL5YyW6aG65bqPXG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gWyAncHJvamVjdFNlcnZpY2UnLCAndXJsU2VydmljZScsICd0eXBlU2VydmljZScsICckbG9jYXRpb24nLCAnJHJvdXRlUGFyYW1zJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnRGlhbG9nU2VydmljZSddO1xuICB9XG5cbiAgY29uc3RydWN0b3IoIHByb2plY3RTZXJ2aWNlLCB1cmxTZXJ2aWNlLCB0eXBlU2VydmljZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsICRyb290U2NvcGUsICRodHRwLCBEaWFsb2dTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHsgJGxvY2F0aW9uLCBwcm9qZWN0U2VydmljZSwgdXJsU2VydmljZSwgdHlwZVNlcnZpY2UsICRyb290U2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMsIERpYWxvZ1NlcnZpY2V9O1xuICAgIHRoaXMubmFtZSA9ICRyb3V0ZVBhcmFtcy5wcm9qZWN0O1xuICAgIHRoaXMuYXBpID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdEFwaUl0ZW0nKSk7XG4gICAgdGhpcy5qc29uTW9kZSA9IHttb2RlOiAndHJlZSd9O1xuICAgIHRoaXMuZW52ID0ge1xuICAgICAgcHJvamVjdDogdGhpcy5uYW1lLFxuICAgICAgbmFtZTogJ2lyb24tbW9jaycsXG4gICAgICBob3N0OiAnMTI3LjAuMC4xOjgwMDAnXG4gICAgfTtcbiAgICB0aGlzLmVudnMgPSBbdGhpcy5lbnZdO1xuICB9XG5cbiAgZ2V0VXJsQXBpcygpIHtcbiAgICB2YXIgeyB1cmxTZXJ2aWNlLCAkcm91dGVQYXJhbXMgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdXJsU2VydmljZS5xdWVyeSh7bmFtZTogYC0keyRyb3V0ZVBhcmFtcy5uYW1lfWB9KVxuICAgICAgLiRwcm9taXNlXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmFwaXMgPSBkYXRhO1xuICAgICAgfSk7XG4gIH1cblxuICBjaG9vc2UoYXBpKSB7XG4gICAgdmFyIHsgcHJvamVjdFNlcnZpY2UgfSA9IHRoaXMuc2VydmljZXM7XG5cbiAgICBwcm9qZWN0U2VydmljZS5zYXZlKHtuYW1lOiB0aGlzLm5hbWV9LCBKU09OLnN0cmluZ2lmeShhcGkpKVxuICAgICAgLiRwcm9taXNlXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiBg5YiH5o2i5oiQ5YqfIWAsXG4gICAgICAgICAgdGV4dDogYOmhueebriR7dGhpcy5uYW1lfeW3sue7j+aIkOWKn+WIh+aNoiR7YXBpLm5hbWV9YCxcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChVdGlsLmNvbW1vbkVycm9yKVxuICB9XG5cbiAgYWRkRW52KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciB7IERpYWxvZ1NlcnZpY2UsIHR5cGVTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuICAgIERpYWxvZ1NlcnZpY2Uuc2hvdyh7XG4gICAgICB0ZW1wbGF0ZVVybDogZW52TW9kYWxUZW1wbGF0ZSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmhpZGUgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbnYgPSB7cHJvamVjdDogc2VsZi5uYW1lfTtcbiAgICAgICAgdGhpcy5zdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgICAgdHlwZVNlcnZpY2Uuc2F2ZShKU09OLnN0cmluZ2lmeSh0aGlzLmVudikpXG4gICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHNlbGYuZW52cy5wdXNoKHRoaXMuZW52KTtcbiAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgVXRpbC5jb21tb25FcnJvcihlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICdtb2RhbCdcbiAgICB9KVxuICB9XG5cbiAgY2hhbmdlRW52KCkge1xuICAgIHZhciB7IHR5cGVTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuXG4gICAgdHlwZVNlcnZpY2Uuc2F2ZSh7bmFtZTogdGhpcy5lbnYubmFtZX0sIHt0eXBlOiB0aGlzLmVudiwgYXBpOiB0aGlzLmFwaX0pXG4gICAgICAuJHByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmm7TmlrDmiJDlip8hJyxcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgICAgIHRleHQ6ICflkK/liqhtb2Nr5pyN5Yqh5Zmo5omN6IO95YiH5o2i546v5aKD77yBJyxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn5Y675ZCv5YqoJ1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gIH1cblxuICBmZXRjaEVudnMoKSB7XG4gICAgdmFyIHsgdHlwZVNlcnZpY2UgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdHlwZVNlcnZpY2UucXVlcnkoe25hbWU6IHRoaXMubmFtZX0pLiRwcm9taXNlXG4gICAgICAudGhlbigoZW52cykgPT4ge1xuICAgICAgICB0aGlzLmVudnMucHVzaCguLi5lbnZzKTtcbiAgICAgICAgZW52cy5zb21lKChlbnYpID0+IHtcbiAgICAgICAgICB2YXIgaXNFeGlzdCA9IGVudi51cmxzLmZpbHRlcigodXJsKSA9PiB1cmwgPT09IHRoaXMuYXBpLnVybCk7XG4gICAgICAgICAgaWYoaXNFeGlzdC5sZW5ndGggPiAwKSByZXR1cm4gdGhpcy5lbnYgPSBlbnY7XG4gICAgICAgIH0pXG4gICAgICB9KVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHZhciB7IHByb2plY3RTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuXG4gICAgcHJvamVjdFNlcnZpY2UudXBkYXRlKHtuYW1lOiB0aGlzLm5hbWV9LCBKU09OLnN0cmluZ2lmeSh0aGlzLmFwaSkpLiRwcm9taXNlXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiAn5pu05paw5oiQ5YqfIScsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn55+l6YGT5LqGISdcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goVXRpbC5jb21tb25FcnJvcilcbiAgfVxuXG5cbiAgc2V0TW9kZUNvZGUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ2NvZGUnO1xuICB9XG5cbiAgc2V0TW9kZVRyZWUoKSB7XG4gICAgdGhpcy5qc29uTW9kZS5tb2RlID0gJ3RyZWUnO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGVtcGxhdGVVcmw6ICcvYXBwL3Byb2plY3REZXRhaWwvcHJvamVjdC5odG1sJyxcbiAgY29udHJvbGxlcjogcHJvamVjdEN0cmwsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL3Byb2plY3REZXRhaWwvcHJvamVjdC5qc1xuICoqLyIsImltcG9ydCAnLi9pbmRleC5odG1sJztcblxuY2xhc3Mgb3JkZXJDdHJsIHtcbiAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgIHJldHVybiBbICckc2NvcGUnXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlbXBsYXRlVXJsOiAnL2FwcC9pbmRleC9pbmRleC5odG1sJyxcbiAgY29udHJvbGxlcjogb3JkZXJDdHJsLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9pbmRleC9pbmRleC5qc1xuICoqLyIsInZhciBwYXRoID0gJy9hcHAvaW5kZXgvaW5kZXguaHRtbCc7XG52YXIgaHRtbCA9IFwiPHA+6L+Z6YeM5piv6aaW6aG1PC9wPlwiO1xud2luZG93LmFuZ3VsYXIubW9kdWxlKCduZycpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oYykgeyBjLnB1dChwYXRoLCBodG1sKSB9XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9pbmRleC9pbmRleC5odG1sXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwYXRoID0gJy9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0Lmh0bWwnO1xudmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiIG5nLWluaXQ9XFxcInZtLmdldFVybEFwaXMoKVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG4gICAgPGgxIGNsYXNzPVxcXCJwYW5lbC10aXRsZSB0ZXh0LWNlbnRlclxcXCIgbmctYmluZD1cXFwiJ+ivt+axgui3r+W+hDogJyArIHZtLmFwaS51cmxcXFwiPjwvaDE+XFxuICA8L2Rpdj5cXG4gIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwibWV0aG9kXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+TWV0aG9kPC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcIm1ldGhvZFxcXCIgbmctbW9kZWw9XFxcInZtLmFwaS5tZXRob2RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImdldFxcXCI+R0VUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicG9zdFxcXCI+UE9TVDwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInB1dFxcXCI+UFVUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZGVsZXRlXFxcIj5ERUxFVEU8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwYXRjaFxcXCI+UEFUQ0g8L29wdGlvbj5cXG4gICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1pbml0PVxcXCJ2bS5mZXRjaEVudnMoKVxcXCI+XFxuICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPkVudmlyb25tZW50PC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwicmFkaW8taW5saW5lXFxcIiBuZy1yZXBlYXQ9XFxcImVudiBpbiB2bS5lbnZzXFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5nLW1vZGVsPVxcXCJ2bS5lbnZcXFwiIG5nLXZhbHVlPVxcXCJlbnZcXFwiPlxcbiAgICAgICAgICAgIDxzcGFuIG5nLWJpbmQ9XFxcIiBlbnYucHJvamVjdCArICcvJyArIGVudi5uYW1lIFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICA8L2xhYmVsPlxcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XFxcIiBuZy1jbGljaz1cXFwidm0uYWRkRW52KClcXFwiPiA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXFxcIj48L3NwYW4+PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1zaG93ID0gXFxcInZtLmVudi5uYW1lID09PSAnaXJvbi1tb2NrJ1xcXCI+XFxuICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPkFQSTwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWluZm9cXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6IGFwaSA9PT0gdm0uYXBpIH1cXFwiIG5nLXJlcGVhdD1cXFwiYXBpIGluIHZtLmFwaXNcXFwiIG5nLWJpbmQ9XFxcImFwaS5uYW1lXFxcIiBuZy1jbGljaz1cXFwidm0uY2hvb3NlKGFwaSlcXFwiPjwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgbmctc2hvdyA9IFxcXCJ2bS5lbnYubmFtZSA9PT0gJ2lyb24tbW9jaydcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvciA9IFxcXCJyZXNwb25zZVxcXCIgY2xhc3MgPSBcXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+UmVzcG9uc2U8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGRpdiBuZy1qc29uZWRpdG9yIG5nLW1vZGVsPVxcXCJ2bS5hcGkucmVzcG9uc2VcXFwiIG9wdGlvbnM9XFxcInZtLmpzb25Nb2RlXFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogMzAwcHg7XFxcIiBwcmVmaXgtdGV4dD1cXFwidHJ1ZVxcXCI+PC9kaXY+XFxuICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMTZweDtcXFwiIG5nLWNsaWNrPVxcXCJ2bS51cGRhdGUoKVxcXCI+5pu05paw5o6l5Y+jPC9idXR0b24+XFxuICAgICAgICAgIDwhLS08YSAgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnNldE1vZGVDb2RlKClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAxNnB4O1xcXCIgbmctaWY9XFxcInZtLmpzb25Nb2RlLm1vZGUgPT09ICd0cmVlJ1xcXCI+cmVzcG9uc2XliIfmjaJjb2Rl5qih5byPPC9hPi0tPlxcbiAgICAgICAgICA8IS0tPGEgIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zZXRNb2RlVHJlZSgpXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMTZweDtcXFwiIG5nLWlmPVxcXCJ2bS5qc29uTW9kZS5tb2RlID09PSAnY29kZSdcXFwiPnJlc3BvbnNl5YiH5o2idHJlZeaooeW8jzwvYT4tLT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIG5nLWlmID0gXFxcInZtLmVudi5uYW1lICE9PSAnaXJvbi1tb2NrJ1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMTZweDtcXFwiIG5nLWNsaWNrPVxcXCJ2bS5jaGFuZ2VFbnYoKVxcXCI+5YiH5o2ie3sgdm0uZW52Lm5hbWUgfX3njq/looM8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZm9ybT5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvcHJvamVjdERldGFpbC9wcm9qZWN0Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiY2xhc3MgVXRpbCB7XG4gIHN0YXRpYyBjb21tb25FcnJvcihlKSB7XG4gICAgc3dhbCh7XG4gICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgdGV4dDogZS5kYXRhLm1lc3NhZ2UsXG4gICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9zZXJ2aWNlcy91dGlsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==