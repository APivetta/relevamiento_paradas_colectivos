'use strict';
angular.module('modules')
  .controller('MapFabButtonController', ['$log', '$state',
    function MapFabButtonController($log, $state) {
      var vm = this;

      function openWizard() {
        $state.go('app.wizard.step1');
      }

      vm.openWizard = openWizard;

      $log.log('Hello from your Controller: MapFabButtonController in module main:. This is your controller:', this);
    }
  ]);
