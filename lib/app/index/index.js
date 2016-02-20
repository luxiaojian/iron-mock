import './index.html';

class orderCtrl {
  static get $inject() {
    return [ '$scope'];
  }
}

export default {
  templateUrl: '/app/index/index.html',
  controller: orderCtrl,
  controllerAs: 'vm'
};
