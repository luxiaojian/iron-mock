require('./url.html');
require('./style.css');

class urlItemCtrl {
  static get $inject() {
    return [ 'projectService', '$routeParams'];
  }

  constructor(projectService, $routeParams) {
    this.services = { projectService, $routeParams };
    var urlItem = JSON.parse(localStorage.getItem('urlItem'));
    this.apis = urlItem.data;
    this.postData = {
      url: urlItem.url,
      project: null,
      api: null
    }
  }

  choose(api) {
    this.postData.api = api;
  }

  submit() {
    var { projectService } = this.services;

    projectService.save({name: this.postData.project}, JSON.stringify(this.postData.api))
      .$promise
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


  fetchProjects() {
    var { projectService } = this.services;

    projectService.query({})
      .$promise
      .then((data) => {
        this.projects = data;
      });
  }
 }

module.exports = {
  templateUrl: '/app/urlDetail/url.html',
  controller: urlItemCtrl,
  controllerAs: 'vm'
};
