require('./url.html');
require('./style.css');
var envModalTemplate = require('./../components/modal/envModal.html');

class urlItemCtrl {
  static get $inject() {
    return [ 'projectService','typeService', '$routeParams', 'DialogService'];
  }

  constructor(projectService, typeService, $routeParams, DialogService) {
    this.services = { projectService, typeService, $routeParams, DialogService };
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

  addEnv() {
    var { DialogService,typeService } = this.services;
    DialogService.show({
      templateUrl: envModalTemplate,
      controller: function() {
        this.hide = () => {
          this.$dialog.hide();
        };

        this.submit = () => {
          typeService.save(JSON.stringify(this.env))
            .$promise
            .then(() => {
              this.$dialog.hide();
            })
        }
      },
      controllerAs: 'modal'
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
