'use strict';
angular.module('modules')
  .controller('MapFabButtonController', ['$log', '$state', '$rootScope',
    function MapFabButtonController($log, $state, $rootScope) {
      var vm = this;

      vm.openWizard = openWizard;
      vm.activateGPS = activateGPS;
      vm.tracking = false;

      function activateGPS() {
        vm.tracking = !vm.tracking;
        $rootScope.$broadcast('track-position', vm.tracking);
      }

      function openWizard() {
        $rootScope.$broadcast('new-stop');
      }

      $rootScope.$on('stop-tracking', function() {
        vm.tracking = false;
        $rootScope.$apply();
      })

      $log.log('Hello from your Controller: MapFabButtonController in module main:. This is your controller:', this);
    }
  ]);
