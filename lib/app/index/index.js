require('./index.html');

class orderCtrl {
  static get $inject() {
    return [ '$scope'];
  }
}

module.exports = {
  templateUrl: '/app/index/index.html',
  controller: orderCtrl,
  controllerAs: 'vm'
};
