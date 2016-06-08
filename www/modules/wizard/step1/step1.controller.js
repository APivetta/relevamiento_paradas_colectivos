'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.wizard.step1', {
      url: '/paso1',
      views: {
        'step-view': {
          templateUrl: 'modules/wizard/step1/step1.tmpl.html',
          controller: 'WizardStepOneController as vm'
        },
        'step-three-fab': ''
      }
    });
  }])
  .controller('WizardStepOneController', ['$scope', '$log', '$state', '$cordovaDevice', 'leafletHelper', 'wizardService', 'locationService',
    function WizardStepOneController($scope, $log, $state, $cordovaDevice, leafletHelper,  wizardService, locationService) {
      var vm = this;

      vm.ready = false;


      wizardService.start();
      vm.fields = wizardService.fields;

      //map 
      var positionMarker = {};
      var accuracyCircle = {};

      function keyboardSubmit($event) {
        $event.preventDefault();
      }

      function next() {

        $state.go('app.wizard.step2');
      }

      function locate() {


        function onSuccess(data) {
          positionMarker.setLatLng([data.lat, data.lng]);
          accuracyCircle.setLatLng([data.lat, data.lng]).setRadius(data.accuracy).addTo(vm.map);
          vm.fields.correccion = false;
        }

        function onFail(error) {
          console.log(error);
        }

        locationService.locate().then(onSuccess, onFail);

      }

      function createMap() {

        function onSuccess(data) {

          leafletHelper.createMap('step1Map', { center: L.latLng(data.lat, data.lng), zoom: 16 }, 'detalle')
            .then(function(map) {
              vm.map = map;

              vm.fields.coordenadas = '( ' + data.lat + ',' + data.lng + ' )';
              vm.fields.correccion = false;
              vm.fields.precision = data.accuracy;

              positionMarker = L.marker([data.lat, data.lng], { draggable: true }).addTo(vm.map)
                .bindPopup('Posicion actual \nprecision: ' + data.accuracy + ' mts')
                .openPopup();

              accuracyCircle = L.circle([data.lat, data.lng], data.accuracy, { fillColor: '#03f', fillOpacity: 0.2, color: '#03f', weight: 2 }).addTo(vm.map);
              //L.Control.geocoder().addTo(vm.map);

              positionMarker.on('dragstart', function() {
                vm.fields.coordenadas = '(' + positionMarker.getLatLng().lat + ',' + positionMarker.getLatLng().lng + ')';
                vm.map.removeLayer(accuracyCircle);
                $scope.$apply();
                if (!vm.fields.correccion) { vm.fields.correccion = true; }
              });
            });

        }

        function onFail(error) {
          console.log(error);
        }

        locationService.locate().then(onSuccess, onFail);

      }

      createMap();

      vm.$state = $state;
      vm.next = next;
      vm.locate = locate;
      vm.createMap = createMap;
      vm.keyboardSubmit = keyboardSubmit;

      $log.log('Hello from your Controller: WizardStepOneController in module main:. This is your controller:', this);

    }
  ]);
