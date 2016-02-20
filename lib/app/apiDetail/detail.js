import './detail.html';

class apiItemCtrl {
  static get $inject() {
    return [ 'apiService', 'projectService', '$location', '$scope'];
  }

  constructor( apiService, projectService, $location, $scope ) {
    this.services = { apiService, projectService, $location, $scope };
    this.api = JSON.parse(localStorage.getItem('apiItem'));
    this.jsonMode = {mode: 'tree'};
  }

  submit() {
    var { apiService, projectService, $location, $scope } = this.services;
    var data = angular.copy(this.api);

    apiService.save({name: this.api.name}, data)
      .$promise
      .then(() => {
        return projectService.save({name: this.projectName}, {name: this.api.name}).$promise
      })
      .then(() => {
        swal({
          title: '数据保存成功',
          text: '接口更新成功!赶紧重启mock server吧!',
          type: 'success',
          confirmButtonText: '知道了!'
        }, (isConfirm) => {
          $location.url('/');
          $scope.$apply();
        });
      })
      .catch((e) => {
        swal({
          title: '出错了!',
          text: e.message,
          type: 'error',
          confirmButtonText: '知道了!'
        })
      })
  }

  setModeCode() {
    this.jsonMode.mode = 'code';
  }

  fetchProjects() {
    var { projectService } = this.services;

    projectService.query({})
      .$promise
      .then((data) => {
        this.projects = data;
      });
  }

  setModeTree() {
    this.jsonMode.mode = 'tree';
  }
}

export default {
  templateUrl: '/app/apiDetail/detail.html',
  controller: apiItemCtrl,
  controllerAs: 'vm'
};
