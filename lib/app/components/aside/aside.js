import './style.css';

import modalTemplate from './../modal/modal.html';
import projectTemplate from './../modal/projectModal.html';
import template from './aside.html';

function /* @ngInject */aside(DialogService, apiService, urlService, projectService, $location, $rootScope, $http) {
  return {
    restrict: 'AE',
    scope:{

    },
    templateUrl: template,
    link: ($scope) => {
      $scope.queryApi = function() {
        $rootScope.type = 'api';
        apiService.query({})
          .$promise
          .then(function(apis) {
            $scope.apis = apis;
          });
      };
      $scope.queryApi();
      $scope.queryUrl = function() {
        $rootScope.type = 'url';
        urlService.query({})
          .$promise
          .then(function(data) {
            $scope.urls = data;
          });
      };

      $scope.queryProject = function() {
        $rootScope.type = 'project';
        projectService.query({})
          .$promise
          .then((data) => {
          $scope.projects = data;
        });
      };

      $scope.addApi = function() {
        DialogService.show({
          templateUrl: modalTemplate,
          controller: function() {
            this.hide = () => {
              this.$dialog.hide();
            };

            this.submit = () => {
              apiService.save(JSON.stringify(this.api))
                .$promise
                .then((data) => {
                  $scope.apis.unshift(data);
                  this.$dialog.hide();
                })
            }
          },
          controllerAs: 'modal'
        })
      };

      $scope.addProject = function() {
        DialogService.show({
          templateUrl: projectTemplate,
          controller: function() {
            this.hide = () => {
              this.$dialog.hide();
            };

            this.projects = [];

            this.submit = () => {
              projectService.save(JSON.stringify(this.project))
                .$promise
                .then((data) => {
                  $scope.projects.unshift(data);

                  this.$dialog.hide();
                })
            }
          },
          controllerAs: 'modal'
        })
      };

      $scope.goApi = function(api) {
        localStorage.setItem('apiItem', JSON.stringify(api));
        $rootScope.type = 'api';
        $location.url(`/apis/${api.name}`)
      };

      $scope.goProjectApi = function(name, api) {
        localStorage.setItem('projectApiItem', JSON.stringify(api));
        var urlName = api.url.replace(/\//, '').replace(/\//g, '-');
        $rootScope.type = 'project';
        $location.url(`/projects/${name}/apis/${urlName}`)
      };

      $scope.goUrl = function(data) {
        var urlName = data.url.replace(/\//, '').replace(/\//g, '-');
        localStorage.setItem('urlItem', JSON.stringify(data));
        $rootScope.type = 'url';
        $location.url(`/urls/${urlName}`);
      };

      $scope.deleteApi = function(api, index) {
        apiService.remove({name: api.name})
          .$promise
          .then(function(){
            $scope.apis.splice(index, 1);
          })
      };

      $scope.deleteUrl = function(url, index) {
        var urlName = url.replace(/\//, '').replace(/\//g, '-');
        urlService.remove({name: urlName})
          .$promise
          .then(function(){
            $scope.urls.splice(index, 1);
          })
      };

      $scope.deleteProjectApi = function(parent, index) {
        var project = $scope.projects[parent];
        var api = project.data.apis[index];
        $http.delete(`/restapi/projects/${project.name}?url=${api.url}`)
          .success(() => {
            project.data.apis.splice(index, 1);
          })
          .error((e) => {
            swal({
              title: '出错了!',
              type: 'error',
              confirmButtonText: '知道了!'
            })
          })
      }

    }
  }
}

export default aside;
