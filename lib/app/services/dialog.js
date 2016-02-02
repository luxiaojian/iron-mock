class Dialog {
  constructor(services) {
    this.services = services;
  }

  init({controller, controllerAs, scope}) {
    var { $controller } = this.services;
    var ctrl = $controller(controller, { scope });

    var dialog = {
      controller: ctrl,
      scope,
      element: this.element,
      hide: this.hide.bind(this)
    };

    ctrl.$dialog = dialog;
    if (controllerAs) scope[controllerAs] = ctrl;

    return dialog;
  }

  show({ parentElement, template, templateUrl, controller, controllerAs }) {
    var { $compile, $rootScope } = this.services;
    var scope = $rootScope.$new();

    return this.fetchTemplate({ template, templateUrl })
      .then(raw => {
        var linkFn = $compile(raw);
        var element = linkFn(scope);

        if (parentElement) {
          this.parentElement = parentElement;
          parentElement.appendChild(element[0]);
        } else {
          document.body.appendChild(element[0]);
        }

        this.element = element;
      })
      .then(() => this.init({ controller, controllerAs, scope }));
  }

  hide() {
    if (this.parentElement) {
      this.parentElement.removeChild(this.element[0]);
    } else {
      document.body.removeChild(this.element[0]);
    }
  }

  fetchTemplate({template, templateUrl}) {
    var { $q, $templateRequest } = this.services;
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
}

export default Dialog;
