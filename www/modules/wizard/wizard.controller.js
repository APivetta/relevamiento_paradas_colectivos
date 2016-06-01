'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.wizard', {
      url: '/asistente',
      views: {
        'viewContent': {
          templateUrl: 'modules/wizard/wizard.tmpl.html'
        },
        'fabContent': ''
      }

    });
  }])
  .controller('WizardController', ['$log', '$state',
    function WizardController($log, $state) {
      var vm = this;

      vm.map = {
        center: {}
      };



      vm.$state = $state;

      navigator.geolocation.getCurrentPosition(function(pos) {

        vm.map.center = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          zoom: 8
        };

      }, function(error) {
        $log.log('Unable to get location: ' + error.message);
      });



      $log.log('Hello from your Controller: WizardController in module main:. This is your controller:', this);

    }
  ]);
