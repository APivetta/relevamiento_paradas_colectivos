'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.detail', {
      url: '/detalle/:paradaID',
      views: {
        'viewContent': {
          'templateUrl': 'modules/detail/detail.tmpl.html',
          controller: 'DetailController as vm'
        },
        'fabContent': ''
      }
    });
  }])
  .controller('DetailController', ['$log', '$state', '$stateParams', '$cordovaDevice', '$cordovaGeolocation', 'paradasService', 'leafletHelper',
    function DetailController($log, $state, $stateParams, $cordovaDevice, $cordovaGeolocation, paradasService, leafletHelper) {
      var vm = this;

      vm.map = {};
      vm.marker = {};
      vm.fields = {};

      vm.fields.id = $stateParams.paradaID;

      function paradaFound(data) {
        console.log(JSON.stringify(data));

        leafletHelper.createMap('detailMap', { center: L.latLng(data.lat, data.lng) }, 'detalle')
          .then(function(map) {
            vm.map = map;
          });

        leafletHelper.createMarker('detailMap', data, 'simple').then(function(marker) {
          vm.marker = marker;
        });

        vm.fields = data;
      }

      function paradaNotFound(error) {
        console.log(error);
      }

      paradasService.get($stateParams.paradaID).then(paradaFound, paradaNotFound);

      console.log($stateParams);

      vm.showMe = function() {
        console.log(JSON.stringify(vm.fields));
      };

      $log.log('Hello from your Controller: DetailController in module main:. This is your controller:', this);

    }
  ]);
