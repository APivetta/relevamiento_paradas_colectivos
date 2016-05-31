'use strict';
angular.module('modules')
  .controller('MapController', ['$log', '$state', 'locationService', 'paradasService', 'leafletHelper', MapController]);

function MapController($log, $state, locationService, paradasService, leafletHelper) {
  var vm = this;

  vm.positionMarker = {};
  vm.map = {};
  createMap();
  vm.openWizard = openWizard;
  vm.locate = locate;

  function openWizard() {
    $state.go('app.wizard.step1');
  }

  function createMap() {
    locationService.locate().then(onSuccess, onFail);

    function onSuccess(data) {
      vm.map = leafletHelper.createMap('map', { center: L.latLng(data.lat, data.lng) }, 'main')
        .then(function(map) {
          vm.map = map;

          vm.positionMarker = L.marker([data.lat, data.lng], { draggable: true }).addTo(vm.map)
            .bindPopup('Posicion actual \nprecision: ' + data.accuracy + " mts")
            .openPopup();

          mapParadas();
        });
    };

    function onFail(error) {

    };


    function mapParadas() {
      paradasService.list().then(function(data) {

        console.log(data);
        data.forEach(function(element, index) {

          var coords = [element.lat, element.lng];


          //L.circle(coords,5).addTo(vm.map)

          L.marker(coords, { clickable: true, draggable: false })
            .addTo(vm.map)
            .on('click', function(e) {
              console.log(e);
              console.log(element.properties);
              $state.go('app.detail', { paradaID: element.id })
            });
        });

      });
    }

  }

  function locate() {
    locationService.locate().then(function(data) {
      console.log(data);
      vm.map.panTo(new L.LatLng(data.lat, data.lng), {
        animate: true,
        duration: 0.5
      });
    });
  };

  $log.log('Hello from your Controller: MapController in module main:. This is your controller:', this);

}
