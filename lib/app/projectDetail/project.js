require('./project.html');

class projectCtrl {

  //注入顺序和初始化顺序
  static get $inject() {
    return [ 'projectService', '$location', '$routeParams', '$rootScope', '$http'];
  }

  constructor( projectService, $location, $routeParams, $rootScope, $http) {
    this.services = { $location, projectService, $rootScope, $http};
    this.name = $routeParams.project;
    this.api = JSON.parse(localStorage.getItem('projectApiItem'));
    this.jsonMode = {mode: 'tree'};
  }

  submit() {
    var { projectService } = this.services;

    projectService.update({name: this.name}, JSON.stringify(this.api)).$promise
      .then(() => {
        swal({
          title: '数据保存成功',
          text: '接口更新成功!赶紧重启mock server吧!',
          type: 'success',
          confirmButtonText: '知道了!'
        })
      })
      .catch((e) => {
        swal({
          title: '出错了!',
          type: 'error',
          confirmButtonText: '知道了!'
        })
      })
  }


  setModeCode() {
    this.jsonMode.mode = 'code';
  }

  setModeTree() {
    this.jsonMode.mode = 'tree';
  }
}

module.exports = {
  templateUrl: '/app/projectDetail/project.html',
  controller: projectCtrl,
  controllerAs: 'vm'
};
