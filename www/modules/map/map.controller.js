'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.map', {
      url: '/map',
      views: {
        'viewContent': {
          templateUrl: 'modules/map/map.tmpl.html',
          controller: 'MapController as vm',
        },
        'fabContent': {
          templateUrl: 'modules/map/fab.tmpl.html',
          controller: 'MapFabButtonController as vm'
        }
      }
    });
  }])
  .controller('MapController', ['$log', '$state', 'locationService', 'paradasService', 'leafletHelper',
    function MapController($log, $state, locationService, paradasService, leafletHelper) {
      var vm = this;

      function openWizard() {
        $state.go('app.wizard.step1');
      }

      function createMap() {
        function mapParadas() {
          paradasService.list().then(function(data) {

            console.log(data);
            data.forEach(function(element) {

              var coords = [element.lat, element.lng];


              //L.circle(coords,5).addTo(vm.map)

              L.marker(coords, { clickable: true, draggable: false })
                .addTo(vm.map)
                .on('click', function(e) {
                  console.log(e);
                  console.log(element.properties);
                  $state.go('app.detail', { paradaID: element.id });
                });
            });

          });
        }

        function onSuccess(data) {
          vm.map = leafletHelper.createMap('map', { center: L.latLng(data.lat, data.lng) }, 'main')
            .then(function(map) {
              vm.map = map;

              vm.positionMarker = L.marker([data.lat, data.lng], { draggable: true }).addTo(vm.map)
                .bindPopup('Posicion actual \nprecision: ' + data.accuracy + ' mts')
                .openPopup();

              mapParadas();
            });
        }

        function onFail() {

        }

        locationService.locate().then(onSuccess, onFail);
      }

      function locate() {
        locationService.locate().then(function(data) {
          console.log(data);
          vm.map.panTo(new L.LatLng(data.lat, data.lng), {
            animate: true,
            duration: 0.5
          });
        });
      }

      vm.positionMarker = {};
      vm.map = {};
      createMap();
      vm.openWizard = openWizard;
      vm.locate = locate;

      $log.log('Hello from your Controller: MapController in module main:. This is your controller:', this);

    }
  ]);
