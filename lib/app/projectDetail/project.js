import './project.html';
import envModalTemplate from './../components/modal/envModal.html';
import Util from './../services/util';

class projectCtrl {

  //注入顺序和初始化顺序
  static get $inject() {
    return [ 'projectService', 'urlService', 'typeService', '$location', '$routeParams', '$rootScope', '$http', 'DialogService'];
  }

  constructor( projectService, urlService, typeService, $location, $routeParams, $rootScope, $http, DialogService) {
    this.services = { $location, projectService, urlService, typeService, $rootScope, $http, $routeParams, DialogService};
    this.name = $routeParams.project;
    this.api = JSON.parse(localStorage.getItem('projectApiItem'));
    this.jsonMode = {mode: 'tree'};
    this.env = {
      project: this.name,
      name: 'iron-mock',
      host: '127.0.0.1:8000'
    };
    this.envs = [this.env];
  }

  getUrlApis() {
    var { urlService, $routeParams } = this.services;
    urlService.query({name: `-${$routeParams.name}`})
      .$promise
      .then((data) => {
        this.apis = data;
      });
  }

  choose(api) {
    var { projectService } = this.services;

    projectService.save({name: this.name}, JSON.stringify(api))
      .$promise
      .then(() => {
        swal({
          title: `切换成功!`,
          text: `项目${this.name}已经成功切换${api.name}`,
          type: 'success',
          confirmButtonText: '知道了!'
        })
      })
      .catch(Util.commonError)
  }

  addEnv() {
    var self = this;

    var { DialogService, typeService } = this.services;
    DialogService.show({
      templateUrl: envModalTemplate,
      controller: function() {
        this.hide = () => {
          this.$dialog.hide();
        };
        this.env = {project: self.name};
        this.submit = () => {
          typeService.save(JSON.stringify(this.env))
            .$promise
            .then((data) => {
              self.envs.push(this.env);
              this.$dialog.hide();
            })
            .catch((e) => {
              this.$dialog.hide();
              Util.commonError(e);
            })
        }
      },
      controllerAs: 'modal'
    })
  }

  changeEnv() {
    var { typeService } = this.services;

    typeService.save({name: this.env.name}, {type: this.env, api: this.api})
      .$promise
      .then(() => {
        swal({
          title: '更新成功!',
          type: 'success',
          confirmButtonText: '知道了!'
        })
      })
      .catch((e) => {
        swal({
          title: '出错了!',
          text: '启动mock服务器才能切换环境！',
          type: 'error',
          confirmButtonText: '去启动'
        })
      });
  }

  fetchEnvs() {
    var { typeService } = this.services;
    typeService.query({name: this.name}).$promise
      .then((envs) => {
        this.envs.push(...envs);
        envs.some((env) => {
          var isExist = env.urls.filter((url) => url === this.api.url);
          if(isExist.length > 0) return this.env = env;
        })
      })
  }

  update() {
    var { projectService } = this.services;

    projectService.update({name: this.name}, JSON.stringify(this.api)).$promise
      .then(() => {
        swal({
          title: '更新成功!',
          type: 'success',
          confirmButtonText: '知道了!'
        })
      })
      .catch(Util.commonError)
  }


  setModeCode() {
    this.jsonMode.mode = 'code';
  }

  setModeTree() {
    this.jsonMode.mode = 'tree';
  }
}

export default {
  templateUrl: '/app/projectDetail/project.html',
  controller: projectCtrl,
  controllerAs: 'vm'
};
