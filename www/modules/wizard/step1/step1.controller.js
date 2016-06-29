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
      },
      params: {
        position: {},
        accuracy: ''
      }
    });
  }])
  .controller('WizardStepOneController', ['$scope', '$log', '$state', '$cordovaDevice', 'leafletHelper', 'wizardService', 'locationService',
    function WizardStepOneController($scope, $log, $state, $cordovaDevice, leafletHelper, wizardService, locationService) {
      var vm = this;

      vm.ready = false;
      vm.$state = $state;
      vm.next = next;
      vm.locate = locate;
      vm.keyboardSubmit = keyboardSubmit;

      vm.position = angular.extend({}, { lat: -34.60372677564638, lng: -58.38165342807769 }, $state.params.position);
      vm.accuracy = $state.params.accuracy || 0;

      wizardService.start();
      vm.fields = wizardService.fields;

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
          vm.map.panTo([data.lat, data.lng], {
            animate: true,
            duration: 0.5
          });
          vm.fields.correccion = false;
          vm.fields.precision = data.accuracy;
        }

        function onFail(error) {
          console.log(error);
        }

        locationService.locate().then(onSuccess, onFail);

      }

      (function createMap() {

        leafletHelper.createMap('step1Map', { center: L.latLng(vm.position.lat, vm.position.lng), zoom: 16 }, 'detalle')
          .then(function(map) {
            vm.map = map;

            vm.fields.coordenadas = '( ' + vm.position.lat + ',' + vm.position.lng + ' )';
            vm.fields.correccion = false;
            vm.fields.precision = vm.accuracy;

            positionMarker = L.marker([vm.position.lat, vm.position.lng], { draggable: true }).addTo(vm.map);

            accuracyCircle = L.circle([vm.position.lat, vm.position.lng], vm.accuracy, { fillColor: '#03f', fillOpacity: 0.2, color: '#03f', weight: 2 }).addTo(vm.map);

            if (vm.accuracy == 0) {
              vm.map.removeLayer(accuracyCircle);
            }

            positionMarker.on('dragstart', function() {
              vm.map.removeLayer(accuracyCircle);
            });

            positionMarker.on('dragend', function() {
              vm.fields.coordenadas = '(' + positionMarker.getLatLng().lat + ',' + positionMarker.getLatLng().lng + ')';
              if (!vm.fields.correccion) { vm.fields.correccion = true; }
              $scope.$apply();
            });
          });
      })();

      $log.log('Hello from your Controller: WizardStepOneController in module main:. This is your controller:', this);

    }
  ]);
