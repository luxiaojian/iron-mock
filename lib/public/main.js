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
	                $scope.apis.push(data);
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
	                $scope.projects.push(data);
	
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
	var html = "<aside>\n  <ul class=\"nav nav-tabs\" ng-init=\"queryApi()\">\n    <li ng-class=\"{'active': $root.type === 'api'}\"><a href=\"Javascript:;\" ng-click=\"queryApi()\">api列表</a></li>\n    <li ng-class=\"{'active': $root.type === 'url'}\"><a href=\"Javascript:;\" ng-click=\"queryUrl()\">接口列表</a></li>\n    <li ng-class=\"{'active': $root.type === 'project'}\"><a href=\"Javascript:;\" ng-click=\"queryProject()\">项目列表</a></li>\n  </ul>\n\n  <div class=\"tab-content\">\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'api'}\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item clearfix\" ng-repeat=\"api in apis\">\n          <span ng-bind=\"api.name\" class=\"pull-left\" ng-click=\"goApi(api)\"></span>\n          <a href = \"Javascript:;\" class = \"btn btn-danger pull-right btn-sm\" ng-click=\"delete(api, $index)\">删除</a>\n        </li>\n      </ul>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addApi()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'url'}\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item text-primary\" ng-repeat=\"data in urls\" ng-bind=\"data.url\" ng-click=\"goUrl(data)\"></li>\n      </ul>\n    </div>\n\n    <div class=\"tab-pane\" ng-class=\"{'active': $root.type === 'project'}\">\n      <uib-accordion>\n        <uib-accordion-group is-open=\"open\" ng-repeat=\"project in projects\">\n          <uib-accordion-heading>\n            <i class=\"glyphicon\" ng-class=\"{'glyphicon-folder-open': open, 'glyphicon-folder-close': !open}\"></i>\n            <span ng-bind=\"project.name\"></span>\n            <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open, 'glyphicon-chevron-right': !open}\"></i>\n          </uib-accordion-heading>\n          <div ng-if=\"project.data.length <= 0\" class=\"text-center\">\n            <p>该项目还没有添加路由赶紧去添加吧!</p>\n            <a ng-click=\"queryUrl()\" class = \"btn btn-danger\">去添加接口</a>\n          </div>\n          <ul class=\"link-list\" ng-if=\"project.data.length > 0\">\n            <li ng-repeat=\"api in project.data track by $index\" class=\"clearfix\">\n              <span class=\"text-primary text-link pull-left\" ng-bind=\"api.url\" ng-click=\"goProjectApi(project.name, api)\"></span>\n              <a href = \"Javascript:;\" class = \"glyphicon glyphicon-trash pull-right text-danger\" ng-click=\"deleteProjectApi($parent.$index, $index)\" style=\"margin-top: 8px;\"></a>\n            </li>\n          </ul>\n        </uib-accordion-group>\n      </uib-accordion>\n\n      <footer><a href=\"Javascript:;\" class=\"text-center\" ng-click=\"addProject()\"><i class=\"glyphicon glyphicon-plus\"></i></a></footer>\n    </div>\n  </div>\n</aside>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzZmOTkyNmQ5NDRmZWQwYjM5YjAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY3NzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvYXBwLnNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL21vZGFsL21vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvbW9kYWwvcHJvamVjdE1vZGFsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvYXBpLmpzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4L2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwaURldGFpbC9kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwaURldGFpbC9kZXRhaWwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvdXJsRGV0YWlsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdXJsRGV0YWlsL3VybC5odG1sIiwid2VicGFjazovLy8uL2FwcC91cmxEZXRhaWwvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3Byb2plY3REZXRhaWwvcHJv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QUcsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDaEM7O2dCQVpHLFdBQVc7O1lBY1Qsa0JBQUc7V0FDRCxjQUFjLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBaEMsY0FBYzs7QUFFcEIscUJBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUN4RSxJQUFJLENBQUMsWUFBTTtBQUNWLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsUUFBUTtBQUNmLGVBQUksRUFBRSwwQkFBMEI7QUFDaEMsZUFBSSxFQUFFLFNBQVM7QUFDZiw0QkFBaUIsRUFBRSxNQUFNO1VBQzFCLENBQUM7UUFDSCxDQUFDLFNBQ0ksQ0FBQyxVQUFDLENBQUMsRUFBSztBQUNaLGFBQUksQ0FBQztBQUNILGdCQUFLLEVBQUUsTUFBTTtBQUNiLGVBQUksRUFBRSxPQUFPO0FBQ2IsNEJBQWlCLEVBQUUsTUFBTTtVQUMxQixDQUFDO1FBQ0gsQ0FBQztNQUNMOzs7WUFHVSx1QkFBRztBQUNaLFdBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztNQUM3Qjs7O1lBRVUsdUJBQUc7QUFDWixXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7TUFDN0I7OztVQTFDRyxXQUFXOzs7QUE2Q2pCLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixjQUFXLEVBQUUsaUNBQWlDO0FBQzlDLGFBQVUsRUFBRSxXQUFXO0FBQ3ZCLGVBQVksRUFBRSxJQUFJO0VBQ25CLEM7Ozs7OztBQ25ERDtBQUNBLHMwQ0FBcTBDLGVBQWUsK0hBQStILDhKQUE4SjtBQUNqbkQsaUVBQWdFLG9CQUFvQjtBQUNwRix1QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc2Zjk5MjZkOTQ0ZmVkMGIzOWIwXG4gKiovIiwicmVxdWlyZSgnLi9jc3Mvc3R5bGUuY3NzJyk7XG5cbnJlcXVpcmUoJy4vc2VydmljZXMvYXBwLnNlcnZpY2VzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYXBwLmRpcmVjdGl2ZXMnKTtcbnJlcXVpcmUoJy4vYXBpJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdlbGVtZScsIFtcbiAgICAnbmdSb3V0ZScsXG4gICAgJ25nUmVzb3VyY2UnLFxuICAgICdpZThwcm92aWRlcicsXG4gICAgJ3VpLmJvb3RzdHJhcCcsXG4gICAgJ25nLmpzb25lZGl0b3InLFxuICAgICdlbGVtZS5zZXJ2aWNlcycsXG4gICAgJ2VsZW1lLmRpcmVjdGl2ZXMnLFxuICAgICdlbGVtZS5hcGlzJ1xuICBdKVxuICAuY29uZmlnKC8qIEBuZ0luamVjdCAqL1tcIiRyb3V0ZVByb3ZpZGVyXCIsIFwiJGxvY2F0aW9uUHJvdmlkZXJcIiwgXCIkcHJvdmlkZVwiLCBcImllOFByb3ZpZGVyXCIsIFwiJGh0dHBQcm92aWRlclwiLCBmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRwcm92aWRlLCBpZThQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xuICAgIC8vIOS/ruWkjSBJRSDkuK0gRXZlbnQ6aW5wdXQg55qEIGJ1Z1xuICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci5qcy9ibG9iL3YxLjMueC9zcmMvbmcvc25pZmZlci5qc1xuICAgICRwcm92aWRlLmRlY29yYXRvcignJHNuaWZmZXInLCBbJyRkZWxlZ2F0ZScsIGZ1bmN0aW9uICgkc25pZmZlcikge1xuICAgICAgLy8gZG9jdW1lbnRNb2RlIOaYryBJRSDni6zmnInmlrnms5VcbiAgICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9jYzE5Njk4OCh2PXZzLjg1KS5hc3B4XG4gICAgICB2YXIgbXNpZSA9IE51bWJlcihkb2N1bWVudC5kb2N1bWVudE1vZGUpLFxuICAgICAgICBkaXZFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgZXZlbnRTdXBwb3J0ID0ge307XG5cbiAgICAgICRzbmlmZmVyLmhhc0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCA9PT0gJ2lucHV0JyAmJiBtc2llIDw9IDExKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXZlbnRTdXBwb3J0W2V2ZW50XSkpIHtcbiAgICAgICAgICBldmVudFN1cHBvcnRbZXZlbnRdID0gKCdvbicgKyBldmVudCkgaW4gZGl2RWxtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50U3VwcG9ydFtldmVudF07XG4gICAgICB9O1xuICAgICAgcmV0dXJuICRzbmlmZmVyO1xuICAgIH1dKTtcblxuICAgIC8v5a+5YWRtaW7ot6/lvoTmnYPpmZDlgZrpmZDliLbvvIzorr7nva5odHRw5oum5oiq5ZmoXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXCIkcVwiLCBcIiRsb2NhdGlvblwiLCBmdW5jdGlvbigkcSwgJGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAncmVzcG9uc2VFcnJvcic6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwIHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pO1xuXG4gIH1dKVxuICAuY29uZmlnKHJlcXVpcmUoJy4vcm91dGUnKSlcbiAgLnJ1bigvKiBuZ0luamVjdCAqL1tcIiRyb290U2NvcGVcIiwgXCIkaHR0cFwiLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cCl7XG4gICAgICRyb290U2NvcGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICRodHRwLmdldCgnL3Jlc3RhcGkvc3RhcnQnKVxuICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICB0aXRsZTogJ21vY2sgc2VydmVyIOWcqDgwMDDnq6/lj6PlkK/liqghJyxcbiAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfnn6XpgZPkuoYhJ1xuICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5ZCv5YqobW9jayBzZXJ2ZXLlh7rplJnkuoYhJyxcbiAgICAgICAgICAgICAgdGV4dDogZS5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICflnKjor5XkuIDmrKEnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgfSlcbiAgICAgfVxuICB9XSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwcC5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jc3Mvc3R5bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIERpYWxvZyA9IHJlcXVpcmUoJy4vZGlhbG9nJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdlbGVtZS5zZXJ2aWNlcycsIFtdKVxuICAuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIFsnJGh0dHAnLCAnJHJvb3RTY29wZScsICckY29udHJvbGxlcicsICckY29tcGlsZScsICckcScsICckdGVtcGxhdGVSZXF1ZXN0JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgJGNvbXBpbGUsICRxLCAkdGVtcGxhdGVSZXF1ZXN0KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBEaWFsb2coeyAkaHR0cCwgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsICRjb21waWxlLCAkcSwgJHRlbXBsYXRlUmVxdWVzdCB9KTtcbiAgfV0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9zZXJ2aWNlcy9hcHAuc2VydmljZXMuanNcbiAqKi8iLCJjbGFzcyBEaWFsb2cge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlcykge1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgfVxuXG4gIGluaXQoe2NvbnRyb2xsZXIsIGNvbnRyb2xsZXJBcywgc2NvcGV9KSB7XG4gICAgdmFyIHsgJGNvbnRyb2xsZXIgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGN0cmwgPSAkY29udHJvbGxlcihjb250cm9sbGVyLCB7IHNjb3BlIH0pO1xuXG4gICAgdmFyIGRpYWxvZyA9IHtcbiAgICAgIGNvbnRyb2xsZXI6IGN0cmwsXG4gICAgICBzY29wZSxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgIGhpZGU6IHRoaXMuaGlkZS5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIGN0cmwuJGRpYWxvZyA9IGRpYWxvZztcbiAgICBpZiAoY29udHJvbGxlckFzKSBzY29wZVtjb250cm9sbGVyQXNdID0gY3RybDtcblxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cblxuICBzaG93KHsgcGFyZW50RWxlbWVudCwgdGVtcGxhdGUsIHRlbXBsYXRlVXJsLCBjb250cm9sbGVyLCBjb250cm9sbGVyQXMgfSkge1xuICAgIHZhciB7ICRjb21waWxlLCAkcm9vdFNjb3BlIH0gPSB0aGlzLnNlcnZpY2VzO1xuICAgIHZhciBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuXG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hUZW1wbGF0ZSh7IHRlbXBsYXRlLCB0ZW1wbGF0ZVVybCB9KVxuICAgICAgLnRoZW4ocmF3ID0+IHtcbiAgICAgICAgdmFyIGxpbmtGbiA9ICRjb21waWxlKHJhdyk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbGlua0ZuKHNjb3BlKTtcblxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50WzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnRbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmluaXQoeyBjb250cm9sbGVyLCBjb250cm9sbGVyQXMsIHNjb3BlIH0pKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50WzBdKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaFRlbXBsYXRlKHt0ZW1wbGF0ZSwgdGVtcGxhdGVVcmx9KSB7XG4gICAgdmFyIHsgJHEsICR0ZW1wbGF0ZVJlcXVlc3QgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVVybCkge1xuICAgICAgJHRlbXBsYXRlUmVxdWVzdCh0ZW1wbGF0ZVVybCkudGhlbihkZWZlcnJlZC5yZXNvbHZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmZXJyZWQucmVqZWN0KCdObyBzcGVjaWZ5IHRlbXBsYXRlIG9yIHRlbXBsYXRlVXJsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvc2VydmljZXMvZGlhbG9nLmpzXG4gKiovIiwidmFyIGFzaWRlID0gcmVxdWlyZSgnLi9hc2lkZS9hc2lkZScpO1xuXG5hbmd1bGFyLm1vZHVsZSgnZWxlbWUuZGlyZWN0aXZlcycsIFtdKVxuICAuZGlyZWN0aXZlKCdlbGVtZUFzaWRlJywgYXNpZGUpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvY29tcG9uZW50cy9hcHAuZGlyZWN0aXZlcy5qc1xuICoqLyIsInJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbnZhciBtb2RhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9tb2RhbC9tb2RhbC5odG1sJyk7XG52YXIgcHJvamVjdFRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbCcpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9hc2lkZS5odG1sJyk7XG5cbmZ1bmN0aW9uIC8qIEBuZ0luamVjdCAqL2FzaWRlKERpYWxvZ1NlcnZpY2UsIGFwaVNlcnZpY2UsIHVybFNlcnZpY2UsIHByb2plY3RTZXJ2aWNlLCAkbG9jYXRpb24sICRyb290U2NvcGUsICRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgc2NvcGU6e1xuXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogdGVtcGxhdGUsXG4gICAgbGluazogKCRzY29wZSkgPT4ge1xuICAgICAgJHNjb3BlLnF1ZXJ5QXBpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdhcGknO1xuICAgICAgICBhcGlTZXJ2aWNlLnF1ZXJ5KHt9KVxuICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFwaXMpIHtcbiAgICAgICAgICAgICRzY29wZS5hcGlzID0gYXBpcztcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAkc2NvcGUucXVlcnlBcGkoKTtcbiAgICAgICRzY29wZS5xdWVyeVVybCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAndXJsJztcbiAgICAgICAgdXJsU2VydmljZS5xdWVyeSh7fSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUudXJscyA9IGRhdGE7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUucXVlcnlQcm9qZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgcHJvamVjdFNlcnZpY2UucXVlcnkoe30pXG4gICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAkc2NvcGUucHJvamVjdHMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5hZGRBcGkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgRGlhbG9nU2VydmljZS5zaG93KHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogbW9kYWxUZW1wbGF0ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnNhdmUoSlNPTi5zdHJpbmdpZnkodGhpcy5hcGkpKVxuICAgICAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUuYXBpcy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnbW9kYWwnXG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuYWRkUHJvamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBEaWFsb2dTZXJ2aWNlLnNob3coe1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBwcm9qZWN0VGVtcGxhdGUsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnByb2plY3RzID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBwcm9qZWN0U2VydmljZS5zYXZlKEpTT04uc3RyaW5naWZ5KHtuYW1lOiB0aGlzLm5hbWV9KSlcbiAgICAgICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2plY3RzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Byb2plY3QnXG4gICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuZ29BcGkgPSBmdW5jdGlvbihhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwaUl0ZW0nLCBKU09OLnN0cmluZ2lmeShhcGkpKTtcbiAgICAgICAgJHJvb3RTY29wZS50eXBlID0gJ2FwaSc7XG4gICAgICAgICRsb2NhdGlvbi51cmwoYC9hcGlzLyR7YXBpLm5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1Byb2plY3RBcGkgPSBmdW5jdGlvbihuYW1lLCBhcGkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcGlJdGVtJywgSlNPTi5zdHJpbmdpZnkoYXBpKSk7XG4gICAgICAgIHZhciB1cmxOYW1lID0gYXBpLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgICRyb290U2NvcGUudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3Byb2plY3RzLyR7bmFtZX0vYXBpcy8ke3VybE5hbWV9YClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5nb1VybCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHVybE5hbWUgPSBkYXRhLnVybC5yZXBsYWNlKC9cXC8vLCAnJykucmVwbGFjZSgvXFwvL2csICctJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1cmxJdGVtJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAndXJsJztcbiAgICAgICAgJGxvY2F0aW9uLnVybChgL3VybHMvJHt1cmxOYW1lfWApO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZUFwaSA9IGZ1bmN0aW9uKGFwaSwgaW5kZXgpIHtcbiAgICAgICAgYXBpU2VydmljZS5yZW1vdmUoe25hbWU6IGFwaS5uYW1lfSlcbiAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHNjb3BlLmFwaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRlbGV0ZVByb2plY3RBcGkgPSBmdW5jdGlvbihwYXJlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9qZWN0ID0gJHNjb3BlLnByb2plY3RzW3BhcmVudF07XG4gICAgICAgIHZhciBhcGkgPSBwcm9qZWN0LmRhdGFbaW5kZXhdO1xuICAgICAgICAkaHR0cC5kZWxldGUoYC9yZXN0YXBpL3Byb2plY3RzLyR7cHJvamVjdC5uYW1lfT91cmw9JHthcGkudXJsfWApXG4gICAgICAgICAgLnN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5kYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLnR5cGUgPSAncHJvamVjdCc7XG4gICAgICAgICAgICAkbG9jYXRpb24udXJsKCcvJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WHuumUmeS6hiEnLFxuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2lkZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9hc2lkZS9zdHlsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwibW9kYWwgaW5cXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6IGJsb2NrOyBwYWRkaW5nLXJpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+5pawYXBpPC9oND5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj5cXG4gICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcImFwaU5hbWVcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5OYW1lPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJhcGlOYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibW9kYWwuYXBpLm5hbWVcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwidXJsXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+VXJsPC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJ1cmxcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJtb2RhbC5hcGkudXJsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcIm1ldGhvZFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPk1ldGhvZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XFxcIm1ldGhvZFxcXCIgbmctbW9kZWw9XFxcIm1vZGFsLmFwaS5tZXRob2RcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJnZXRcXFwiPkdFVDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwb3N0XFxcIj5QT1NUPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInB1dFxcXCI+UFVUPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImRlbGV0ZVxcXCI+REVMRVRFPC9vcHRpb24+XFxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInBhdGNoXFxcIj5QQVRDSDwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLmhpZGUoKVxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+5Y+W5raIPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcIm1vZGFsLnN1Ym1pdCgpXFxcIj7liJvlu7phcGk8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwYXRoID0gJy9hcHAvY29tcG9uZW50cy9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwibW9kYWwgaW5cXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6IGJsb2NrOyBwYWRkaW5nLXJpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1kaWFsb2dcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1jb250ZW50XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXIgdGV4dC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJtb2RhbC10aXRsZVxcXCI+5re75Yqg5paw6aG555uuPC9oND5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib2R5XFxcIj5cXG4gICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcIm5hbWVcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj7pobnnm67lkI06PC9sYWJlbD5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwicHJvamVjdC5uYW1lXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Zvcm0+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1jbGljaz1cXFwicHJvamVjdC5oaWRlKClcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPuWPlua2iDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJwcm9qZWN0LnN1Ym1pdCgpXFxcIj7liJvlu7rpobnnm648L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY29tcG9uZW50cy9tb2RhbC9wcm9qZWN0TW9kYWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2NvbXBvbmVudHMvYXNpZGUvYXNpZGUuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGFzaWRlPlxcbiAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2LXRhYnNcXFwiIG5nLWluaXQ9XFxcInF1ZXJ5QXBpKClcXFwiPlxcbiAgICA8bGkgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ2FwaSd9XFxcIj48YSBocmVmPVxcXCJKYXZhc2NyaXB0OjtcXFwiIG5nLWNsaWNrPVxcXCJxdWVyeUFwaSgpXFxcIj5hcGnliJfooag8L2E+PC9saT5cXG4gICAgPGxpIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZSc6ICRyb290LnR5cGUgPT09ICd1cmwnfVxcXCI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBuZy1jbGljaz1cXFwicXVlcnlVcmwoKVxcXCI+5o6l5Y+j5YiX6KGoPC9hPjwvbGk+XFxuICAgIDxsaSBuZy1jbGFzcz1cXFwieydhY3RpdmUnOiAkcm9vdC50eXBlID09PSAncHJvamVjdCd9XFxcIj48YSBocmVmPVxcXCJKYXZhc2NyaXB0OjtcXFwiIG5nLWNsaWNrPVxcXCJxdWVyeVByb2plY3QoKVxcXCI+6aG555uu5YiX6KGoPC9hPjwvbGk+XFxuICA8L3VsPlxcblxcbiAgPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZVxcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ2FwaSd9XFxcIj5cXG4gICAgICA8dWwgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxpIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gY2xlYXJmaXhcXFwiIG5nLXJlcGVhdD1cXFwiYXBpIGluIGFwaXNcXFwiPlxcbiAgICAgICAgICA8c3BhbiBuZy1iaW5kPVxcXCJhcGkubmFtZVxcXCIgY2xhc3M9XFxcInB1bGwtbGVmdFxcXCIgbmctY2xpY2s9XFxcImdvQXBpKGFwaSlcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgPGEgaHJlZiA9IFxcXCJKYXZhc2NyaXB0OjtcXFwiIGNsYXNzID0gXFxcImJ0biBidG4tZGFuZ2VyIHB1bGwtcmlnaHQgYnRuLXNtXFxcIiBuZy1jbGljaz1cXFwiZGVsZXRlKGFwaSwgJGluZGV4KVxcXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcblxcbiAgICAgIDxmb290ZXI+PGEgaHJlZj1cXFwiSmF2YXNjcmlwdDo7XFxcIiBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiIG5nLWNsaWNrPVxcXCJhZGRBcGkoKVxcXCI+PGkgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1xcXCI+PC9pPjwvYT48L2Zvb3Rlcj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi1wYW5lXFxcIiBuZy1jbGFzcz1cXFwieydhY3RpdmUnOiAkcm9vdC50eXBlID09PSAndXJsJ31cXFwiPlxcbiAgICAgIDx1bCBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LXByaW1hcnlcXFwiIG5nLXJlcGVhdD1cXFwiZGF0YSBpbiB1cmxzXFxcIiBuZy1iaW5kPVxcXCJkYXRhLnVybFxcXCIgbmctY2xpY2s9XFxcImdvVXJsKGRhdGEpXFxcIj48L2xpPlxcbiAgICAgIDwvdWw+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZVxcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogJHJvb3QudHlwZSA9PT0gJ3Byb2plY3QnfVxcXCI+XFxuICAgICAgPHVpYi1hY2NvcmRpb24+XFxuICAgICAgICA8dWliLWFjY29yZGlvbi1ncm91cCBpcy1vcGVuPVxcXCJvcGVuXFxcIiBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gcHJvamVjdHNcXFwiPlxcbiAgICAgICAgICA8dWliLWFjY29yZGlvbi1oZWFkaW5nPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJnbHlwaGljb25cXFwiIG5nLWNsYXNzPVxcXCJ7J2dseXBoaWNvbi1mb2xkZXItb3Blbic6IG9wZW4sICdnbHlwaGljb24tZm9sZGVyLWNsb3NlJzogIW9wZW59XFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4gbmctYmluZD1cXFwicHJvamVjdC5uYW1lXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcInB1bGwtcmlnaHQgZ2x5cGhpY29uXFxcIiBuZy1jbGFzcz1cXFwieydnbHlwaGljb24tY2hldnJvbi1kb3duJzogb3BlbiwgJ2dseXBoaWNvbi1jaGV2cm9uLXJpZ2h0JzogIW9wZW59XFxcIj48L2k+XFxuICAgICAgICAgIDwvdWliLWFjY29yZGlvbi1oZWFkaW5nPlxcbiAgICAgICAgICA8ZGl2IG5nLWlmPVxcXCJwcm9qZWN0LmRhdGEubGVuZ3RoIDw9IDBcXFwiIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgPHA+6K+l6aG555uu6L+Y5rKh5pyJ5re75Yqg6Lev55Sx6LW257Sn5Y675re75Yqg5ZCnITwvcD5cXG4gICAgICAgICAgICA8YSBuZy1jbGljaz1cXFwicXVlcnlVcmwoKVxcXCIgY2xhc3MgPSBcXFwiYnRuIGJ0bi1kYW5nZXJcXFwiPuWOu+a3u+WKoOaOpeWPozwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDx1bCBjbGFzcz1cXFwibGluay1saXN0XFxcIiBuZy1pZj1cXFwicHJvamVjdC5kYXRhLmxlbmd0aCA+IDBcXFwiPlxcbiAgICAgICAgICAgIDxsaSBuZy1yZXBlYXQ9XFxcImFwaSBpbiBwcm9qZWN0LmRhdGEgdHJhY2sgYnkgJGluZGV4XFxcIiBjbGFzcz1cXFwiY2xlYXJmaXhcXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRleHQtcHJpbWFyeSB0ZXh0LWxpbmsgcHVsbC1sZWZ0XFxcIiBuZy1iaW5kPVxcXCJhcGkudXJsXFxcIiBuZy1jbGljaz1cXFwiZ29Qcm9qZWN0QXBpKHByb2plY3QubmFtZSwgYXBpKVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgPGEgaHJlZiA9IFxcXCJKYXZhc2NyaXB0OjtcXFwiIGNsYXNzID0gXFxcImdseXBoaWNvbiBnbHlwaGljb24tdHJhc2ggcHVsbC1yaWdodCB0ZXh0LWRhbmdlclxcXCIgbmctY2xpY2s9XFxcImRlbGV0ZVByb2plY3RBcGkoJHBhcmVudC4kaW5kZXgsICRpbmRleClcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiA4cHg7XFxcIj48L2E+XFxuICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgPC91bD5cXG4gICAgICAgIDwvdWliLWFjY29yZGlvbi1ncm91cD5cXG4gICAgICA8L3VpYi1hY2NvcmRpb24+XFxuXFxuICAgICAgPGZvb3Rlcj48YSBocmVmPVxcXCJKYXZhc2NyaXB0OjtcXFwiIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCIgbmctY2xpY2s9XFxcImFkZFByb2plY3QoKVxcXCI+PGkgY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1xcXCI+PC9pPjwvYT48L2Zvb3Rlcj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2FzaWRlPlwiO1xud2luZG93LmFuZ3VsYXIubW9kdWxlKCduZycpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oYykgeyBjLnB1dChwYXRoLCBodG1sKSB9XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jb21wb25lbnRzL2FzaWRlL2FzaWRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiYW5ndWxhci5tb2R1bGUoJ2VsZW1lLmFwaXMnLCBbXSlcbiAgLmZhY3RvcnkoJ2FwaVNlcnZpY2UnLC8qIEBuZ0luamVjdCAqLygkcmVzb3VyY2UpID0+IHtcbiAgICByZXR1cm4gJHJlc291cmNlKCcvcmVzdGFwaS9hcGlzLzpuYW1lJywge25hbWUgOiAnQG5hbWUnfSwge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ3VybFNlcnZpY2UnLC8qIEBuZ0luamVjdCAqLygkcmVzb3VyY2UpID0+IHtcbiAgICByZXR1cm4gJHJlc291cmNlKCcvcmVzdGFwaS91cmxzLzpuYW1lJywge25hbWUgOiAnQG5hbWUnfSwge1xuICAgICAgdXBkYXRlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgLmZhY3RvcnkoJ3Byb2plY3RTZXJ2aWNlJywvKiBAbmdJbmplY3QgKi8oJHJlc291cmNlKSA9PiB7XG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL3Jlc3RhcGkvcHJvamVjdHMvOm5hbWUnLCB7bmFtZSA6ICdAbmFtZSd9LCB7XG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL2FwaS5qc1xuICoqLyIsIlxuY29uc3Qgcm91dGVDb25maWcgPSBbXG4gIFsnLycsIHJlcXVpcmUoJy4vaW5kZXgvaW5kZXgnKV0sXG4gIFsnL2FwaXMvOm5hbWUnLCByZXF1aXJlKCcuL2FwaURldGFpbC9kZXRhaWwnKV0sXG4gIFsnL3VybHMvOm5hbWUnLCByZXF1aXJlKCcuL3VybERldGFpbC91cmwnKV0sXG4gIFsnL3Byb2plY3RzLzpwcm9qZWN0L2FwaXMvOm5hbWUnLCByZXF1aXJlKCcuL3Byb2plY3REZXRhaWwvcHJvamVjdCcpXVxuXTtcblxuY29uc3QgY29uZmlnID0gIC8qIEBuZ0luamVjdCAqL1tcIiRyb3V0ZVByb3ZpZGVyXCIsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gIHJvdXRlQ29uZmlnLmZvckVhY2goZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oY29uZmlnWzBdLCBjb25maWdbMV0pO1xuICB9KTtcblxuICAkcm91dGVQcm92aWRlci5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiAnLzQwNCcgfSk7XG59XTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9yb3V0ZS5qc1xuICoqLyIsInJlcXVpcmUoJy4vaW5kZXguaHRtbCcpO1xuXG5jbGFzcyBvcmRlckN0cmwge1xuICBzdGF0aWMgZ2V0ICRpbmplY3QoKSB7XG4gICAgcmV0dXJuIFsgJyRzY29wZSddO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZVVybDogJy9hcHAvaW5kZXgvaW5kZXguaHRtbCcsXG4gIGNvbnRyb2xsZXI6IG9yZGVyQ3RybCxcbiAgY29udHJvbGxlckFzOiAndm0nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvaW5kZXgvaW5kZXguanNcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL2luZGV4L2luZGV4Lmh0bWwnO1xudmFyIGh0bWwgPSBcIjxwPui/memHjOaYr+mmlumhtTwvcD5cIjtcbndpbmRvdy5hbmd1bGFyLm1vZHVsZSgnbmcnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKGMpIHsgYy5wdXQocGF0aCwgaHRtbCkgfV0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvaW5kZXgvaW5kZXguaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL2RldGFpbC5odG1sJyk7XG5cbmNsYXNzIGFwaUl0ZW1DdHJsIHtcbiAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgIHJldHVybiBbICdhcGlTZXJ2aWNlJywgJyRsb2NhdGlvbicsICckc2NvcGUnXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCBhcGlTZXJ2aWNlLCAkbG9jYXRpb24sICRzY29wZSApIHtcbiAgICB0aGlzLnNlcnZpY2VzID0geyBhcGlTZXJ2aWNlLCAkbG9jYXRpb24sICRzY29wZSB9O1xuICAgIHRoaXMuYXBpID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBpSXRlbScpKTtcbiAgICB0aGlzLmpzb25Nb2RlID0ge21vZGU6ICd0cmVlJ307XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdmFyIHsgYXBpU2VydmljZSwgJGxvY2F0aW9uLCAkc2NvcGUgfSA9IHRoaXMuc2VydmljZXM7XG4gICAgdmFyIGRhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy5hcGkpO1xuXG4gICAgYXBpU2VydmljZS5zYXZlKHtuYW1lOiB0aGlzLmFwaS5uYW1lfSwgZGF0YSlcbiAgICAgIC4kcHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+aVsOaNruS/neWtmOaIkOWKnycsXG4gICAgICAgICAgdGV4dDogJ+aOpeWPo+abtOaWsOaIkOWKnyHotbbntKfph43lkK9tb2NrIHNlcnZlcuWQpyEnLFxuICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgIH0sIChpc0NvbmZpcm0pID0+IHtcbiAgICAgICAgICAkbG9jYXRpb24udXJsKCcvJyk7XG4gICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gIH1cblxuICBzZXRNb2RlQ29kZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAnY29kZSc7XG4gIH1cblxuICBzZXRNb2RlVHJlZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAndHJlZSc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnL2FwcC9hcGlEZXRhaWwvZGV0YWlsLmh0bWwnLFxuICBjb250cm9sbGVyOiBhcGlJdGVtQ3RybCxcbiAgY29udHJvbGxlckFzOiAndm0nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L25nLWFubm90YXRlLWxvYWRlci9sb2FkZXIuanM/YWRkPXRydWUhLi9+L2pzaGludC1sb2FkZXIhLi9hcHAvYXBpRGV0YWlsL2RldGFpbC5qc1xuICoqLyIsInZhciBwYXRoID0gJy9hcHAvYXBpRGV0YWlsL2RldGFpbC5odG1sJztcbnZhciBodG1sID0gXCI8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIiBuZy1pbml0PVxcXCJ2bS5nZXRBcGkoKVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG4gICAgPGgxIGNsYXNzPVxcXCJwYW5lbC10aXRsZSB0ZXh0LWNlbnRlclxcXCIgbmctYmluZD1cXFwiJ+aOpeWPo+WQjeensCcgKyB2bS5hcGkubmFtZVxcXCIgbmctaWY9XFxcInZtLmFwaS5uYW1lXFxcIj48L2gxPlxcbiAgPC9kaXY+XFxuICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIiBub3ZhbGlkYXRlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgIDxsYWJlbCBmb3I9XFxcInVybFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlVybDwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8aW5wdXQgaWQ9XFxcInVybFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInZtLmFwaS51cmxcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJtZXRob2RcXFwiIGNsYXNzPVxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5NZXRob2Q8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPHNlbGVjdCBpZD1cXFwibWV0aG9kXFxcIiBuZy1tb2RlbD1cXFwidm0uYXBpLm1ldGhvZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiZ2V0XFxcIj5HRVQ8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwb3N0XFxcIj5QT1NUPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicHV0XFxcIj5QVVQ8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJkZWxldGVcXFwiPkRFTEVURTwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInBhdGNoXFxcIj5QQVRDSDwvb3B0aW9uPlxcbiAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvciA9IFxcXCJyZXNwb25zZVxcXCIgY2xhc3MgPSBcXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+UmVzcG9uc2U6PC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxkaXYgbmctanNvbmVkaXRvciBuZy1tb2RlbD1cXFwidm0uYXBpLnJlc3BvbnNlXFxcIiBuYW1lID0gJ2pzb25FZGl0b3InIG9wdGlvbnM9XFxcInZtLmpzb25Nb2RlXFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogMzAwcHg7XFxcIiBwcmVmaXgtdGV4dD1cXFwidHJ1ZVxcXCI+PC9kaXY+XFxuICAgICAgICAgIDxhICBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc2V0TW9kZUNvZGUoKVxcXCIgc3R5bGU9XFxcIm1hcmdpbi10b3A6IDE2cHg7XFxcIiBuZy1pZj1cXFwidm0uanNvbk1vZGUubW9kZSA9PT0gJ3RyZWUnXFxcIj5yZXNwb25zZeWIh+aNomNvZGXmqKHlvI88L2E+XFxuICAgICAgICAgIDxhICBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc2V0TW9kZVRyZWUoKVxcXCIgc3R5bGU9XFxcIm1hcmdpbi10b3A6IDE2cHg7XFxcIiBuZy1pZj1cXFwidm0uanNvbk1vZGUubW9kZSA9PT0gJ2NvZGUnXFxcIj5yZXNwb25zZeWIh+aNonRyZWXmqKHlvI88L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWZvb3RlclxcXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zdWJtaXQoKVxcXCI+5L+d5a2YPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9mb3JtPlxcbjwvZGl2PlwiO1xud2luZG93LmFuZ3VsYXIubW9kdWxlKCduZycpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oYykgeyBjLnB1dChwYXRoLCBodG1sKSB9XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9hcGlEZXRhaWwvZGV0YWlsLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi91cmwuaHRtbCcpO1xucmVxdWlyZSgnLi9zdHlsZS5jc3MnKTtcblxuY2xhc3MgdXJsSXRlbUN0cmwge1xuICBzdGF0aWMgZ2V0ICRpbmplY3QoKSB7XG4gICAgcmV0dXJuIFsgJ3Byb2plY3RTZXJ2aWNlJywgJyRyb3V0ZVBhcmFtcyddO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvamVjdFNlcnZpY2UsICRyb3V0ZVBhcmFtcykge1xuICAgIHRoaXMuc2VydmljZXMgPSB7IHByb2plY3RTZXJ2aWNlLCAkcm91dGVQYXJhbXMgfTtcbiAgICB2YXIgdXJsSXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VybEl0ZW0nKSk7XG4gICAgdGhpcy5hcGlzID0gdXJsSXRlbS5kYXRhO1xuICAgIHRoaXMucG9zdERhdGEgPSB7XG4gICAgICB1cmw6IHVybEl0ZW0udXJsLFxuICAgICAgcHJvamVjdDogbnVsbCxcbiAgICAgIGFwaTogbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNob29zZShhcGkpIHtcbiAgICB0aGlzLnBvc3REYXRhLmFwaSA9IGFwaTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB2YXIgeyBwcm9qZWN0U2VydmljZSB9ID0gdGhpcy5zZXJ2aWNlcztcblxuICAgIHByb2plY3RTZXJ2aWNlLnNhdmUoe25hbWU6IHRoaXMucG9zdERhdGEucHJvamVjdH0sIEpTT04uc3RyaW5naWZ5KHRoaXMucG9zdERhdGEuYXBpKSlcbiAgICAgIC4kcHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+aVsOaNruS/neWtmOaIkOWKnycsXG4gICAgICAgICAgdGV4dDogJ+aOpeWPo+abtOaWsOaIkOWKnyHotbbntKfph43lkK9tb2NrIHNlcnZlcuWQpyEnLFxuICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqGIScsXG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgIH0pXG4gICAgICB9KVxuICB9XG5cblxuICBmZXRjaFByb2plY3RzKCkge1xuICAgIHZhciB7IHByb2plY3RTZXJ2aWNlIH0gPSB0aGlzLnNlcnZpY2VzO1xuXG4gICAgcHJvamVjdFNlcnZpY2UucXVlcnkoe30pXG4gICAgICAuJHByb21pc2VcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBkYXRhO1xuICAgICAgfSk7XG4gIH1cbiB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZVVybDogJy9hcHAvdXJsRGV0YWlsL3VybC5odG1sJyxcbiAgY29udHJvbGxlcjogdXJsSXRlbUN0cmwsXG4gIGNvbnRyb2xsZXJBczogJ3ZtJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9uZy1hbm5vdGF0ZS1sb2FkZXIvbG9hZGVyLmpzP2FkZD10cnVlIS4vfi9qc2hpbnQtbG9hZGVyIS4vYXBwL3VybERldGFpbC91cmwuanNcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL3VybERldGFpbC91cmwuaHRtbCc7XG52YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5IGZvcm0taG9yaXpvbnRhbFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XFxcInVybFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPlVybDwvbGFiZWw+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgIDxpbnB1dCBpZD1cXFwidXJsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwidm0ucG9zdERhdGEudXJsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIG5nLWluaXQ9XFxcInZtLmZldGNoUHJvamVjdHMoKVxcXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cXFwibWV0aG9kXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+UHJvamVjdDo8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICA8c2VsZWN0IGlkPVxcXCJtZXRob2RcXFwiIG5nLW1vZGVsPVxcXCJ2bS5wb3N0RGF0YS5wcm9qZWN0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwie3sgcHJvamVjdC5uYW1lIH19XFxcIiBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gdm0ucHJvamVjdHNcXFwiIG5nLWJpbmQ9XFxcInByb2plY3QubmFtZVxcXCI+PC9vcHRpb24+XFxuICAgICAgICA8L3NlbGVjdD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+QVBJOjwvbGFiZWw+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4taW5mb1xcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlJzogYXBpID09PSB2bS5wb3N0RGF0YS5hcGkgfVxcXCIgbmctcmVwZWF0PVxcXCJhcGkgaW4gdm0uYXBpc1xcXCIgbmctYmluZD1cXFwiYXBpLm5hbWVcXFwiIG5nLWNsaWNrPVxcXCJ2bS5jaG9vc2UoYXBpKVxcXCI+PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1mb290ZXJcXFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcInZtLnN1Ym1pdCgpXFxcIj7kv53lrZjmlbDmja48L2J1dHRvbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlwiO1xud2luZG93LmFuZ3VsYXIubW9kdWxlKCduZycpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oYykgeyBjLnB1dChwYXRoLCBodG1sKSB9XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC91cmxEZXRhaWwvdXJsLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL3VybERldGFpbC9zdHlsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi9wcm9qZWN0Lmh0bWwnKTtcblxuY2xhc3MgcHJvamVjdEN0cmwge1xuXG4gIC8v5rOo5YWl6aG65bqP5ZKM5Yid5aeL5YyW6aG65bqPXG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gWyAncHJvamVjdFNlcnZpY2UnLCAnJGxvY2F0aW9uJywgJyRyb3V0ZVBhcmFtcycsICckcm9vdFNjb3BlJywgJyRodHRwJ107XG4gIH1cblxuICBjb25zdHJ1Y3RvciggcHJvamVjdFNlcnZpY2UsICRsb2NhdGlvbiwgJHJvdXRlUGFyYW1zLCAkcm9vdFNjb3BlLCAkaHR0cCkge1xuICAgIHRoaXMuc2VydmljZXMgPSB7ICRsb2NhdGlvbiwgcHJvamVjdFNlcnZpY2UsICRyb290U2NvcGUsICRodHRwfTtcbiAgICB0aGlzLm5hbWUgPSAkcm91dGVQYXJhbXMucHJvamVjdDtcbiAgICB0aGlzLmFwaSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RBcGlJdGVtJykpO1xuICAgIHRoaXMuanNvbk1vZGUgPSB7bW9kZTogJ3RyZWUnfTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB2YXIgeyBwcm9qZWN0U2VydmljZSB9ID0gdGhpcy5zZXJ2aWNlcztcblxuICAgIHByb2plY3RTZXJ2aWNlLnVwZGF0ZSh7bmFtZTogdGhpcy5uYW1lfSwgSlNPTi5zdHJpbmdpZnkodGhpcy5hcGkpKS4kcHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzd2FsKHtcbiAgICAgICAgICB0aXRsZTogJ+aVsOaNruS/neWtmOaIkOWKnycsXG4gICAgICAgICAgdGV4dDogJ+aOpeWPo+abtOaWsOaIkOWKnyHotbbntKfph43lkK9tb2NrIHNlcnZlcuWQpyEnLFxuICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIHN3YWwoe1xuICAgICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqGIScsXG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+efpemBk+S6hiEnXG4gICAgICAgIH0pXG4gICAgICB9KVxuICB9XG5cblxuICBzZXRNb2RlQ29kZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAnY29kZSc7XG4gIH1cblxuICBzZXRNb2RlVHJlZSgpIHtcbiAgICB0aGlzLmpzb25Nb2RlLm1vZGUgPSAndHJlZSc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlVXJsOiAnL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuaHRtbCcsXG4gIGNvbnRyb2xsZXI6IHByb2plY3RDdHJsLFxuICBjb250cm9sbGVyQXM6ICd2bSdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vbmctYW5ub3RhdGUtbG9hZGVyL2xvYWRlci5qcz9hZGQ9dHJ1ZSEuL34vanNoaW50LWxvYWRlciEuL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuanNcbiAqKi8iLCJ2YXIgcGF0aCA9ICcvYXBwL3Byb2plY3REZXRhaWwvcHJvamVjdC5odG1sJztcbnZhciBodG1sID0gXCI8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIiBuZy1pbml0PVxcXCJ2bS5nZXRBcGkoKVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG4gICAgPGgxIGNsYXNzPVxcXCJwYW5lbC10aXRsZSB0ZXh0LWNlbnRlclxcXCIgbmctYmluZD1cXFwiJ+mhueebruWQjeensDonICsgdm0ubmFtZVxcXCIgbmctaWY9XFxcInZtLm5hbWVcXFwiPjwvaDE+XFxuICA8L2Rpdj5cXG4gIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiIG5vdmFsaWRhdGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwidXJsXFxcIiBjbGFzcz1cXFwiY29sLXNtLTIgY29udHJvbC1sYWJlbFxcXCI+VXJsPC9sYWJlbD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxuICAgICAgICAgIDxpbnB1dCBpZD1cXFwidXJsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwidm0uYXBpLnVybFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgIDxsYWJlbCBmb3I9XFxcIm1ldGhvZFxcXCIgY2xhc3M9XFxcImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcXFwiPk1ldGhvZDwvbGFiZWw+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcbiAgICAgICAgICA8c2VsZWN0IGlkPVxcXCJtZXRob2RcXFwiIG5nLW1vZGVsPVxcXCJ2bS5hcGkubWV0aG9kXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJnZXRcXFwiPkdFVDwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcInBvc3RcXFwiPlBPU1Q8L29wdGlvbj5cXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJwdXRcXFwiPlBVVDwvb3B0aW9uPlxcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XFxcImRlbGV0ZVxcXCI+REVMRVRFPC9vcHRpb24+XFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwicGF0Y2hcXFwiPlBBVENIPC9vcHRpb24+XFxuICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yID0gXFxcInJlc3BvbnNlXFxcIiBjbGFzcyA9IFxcXCJjb2wtc20tMiBjb250cm9sLWxhYmVsXFxcIj5SZXNwb25zZTo8L2xhYmVsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXG4gICAgICAgICAgPGRpdiBuZy1qc29uZWRpdG9yIG5nLW1vZGVsPVxcXCJ2bS5hcGkucmVzcG9uc2VcXFwiIG9wdGlvbnM9XFxcInZtLmpzb25Nb2RlXFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCU7IGhlaWdodDogMzAwcHg7XFxcIiBwcmVmaXgtdGV4dD1cXFwidHJ1ZVxcXCI+PC9kaXY+XFxuICAgICAgICAgIDxhICBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc2V0TW9kZUNvZGUoKVxcXCIgc3R5bGU9XFxcIm1hcmdpbi10b3A6IDE2cHg7XFxcIiBuZy1pZj1cXFwidm0uanNvbk1vZGUubW9kZSA9PT0gJ3RyZWUnXFxcIj5yZXNwb25zZeWIh+aNomNvZGXmqKHlvI88L2E+XFxuICAgICAgICAgIDxhICBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwidm0uc2V0TW9kZVRyZWUoKVxcXCIgc3R5bGU9XFxcIm1hcmdpbi10b3A6IDE2cHg7XFxcIiBuZy1pZj1cXFwidm0uanNvbk1vZGUubW9kZSA9PT0gJ2NvZGUnXFxcIj5yZXNwb25zZeWIh+aNonRyZWXmqKHlvI88L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWZvb3RlclxcXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJ2bS5zdWJtaXQoKVxcXCI+5pu05pawPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9mb3JtPlxcbjwvZGl2PlxcblwiO1xud2luZG93LmFuZ3VsYXIubW9kdWxlKCduZycpLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oYykgeyBjLnB1dChwYXRoLCBodG1sKSB9XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9wcm9qZWN0RGV0YWlsL3Byb2plY3QuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9