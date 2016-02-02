require('./detail.html');

class apiItemCtrl {
  static get $inject() {
    return [ 'apiService', '$location', '$scope'];
  }

  constructor( apiService, $location, $scope ) {
    this.services = { apiService, $location, $scope };
    this.api = JSON.parse(localStorage.getItem('apiItem'));
    this.jsonMode = {mode: 'tree'};
  }

  submit() {
    var { apiService, $location, $scope } = this.services;
    var data = angular.copy(this.api);

    apiService.save({name: this.api.name}, data)
      .$promise
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
  }

  setModeCode() {
    this.jsonMode.mode = 'code';
  }

  setModeTree() {
    this.jsonMode.mode = 'tree';
  }
}

module.exports = {
  templateUrl: '/app/apiDetail/detail.html',
  controller: apiItemCtrl,
  controllerAs: 'vm'
};
