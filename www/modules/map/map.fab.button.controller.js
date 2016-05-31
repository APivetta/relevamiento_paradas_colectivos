'use strict';
angular.module('modules')
  .controller('MapFabButtonController', ['$log', '$state', MapFabButtonController]);


function MapFabButtonController($log, $state) {
  var vm = this;

  vm.openWizard = openWizard;

  function openWizard() {
    $state.go('app.wizard.step1');
  }

  $log.log('Hello from your Controller: MapFabButtonController in module main:. This is your controller:', this);
}
