'use strict';
angular.module('services').factory('wizardService', ['$q', 'storageService',
  function wizardService($q, storageService) {

    var active = false;
    var fields = {};

    var picture = {};

    function start() {
      active = true;
      fields = {};

    }

    function store() {

      storageService.handleStorage();

    }

    return {
      start: start,
      fields: fields,
      picture: picture,
      store: store
    };

  }
]);
