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
  .controller('MapController', ['$scope', '$log', '$state', 'locationService', 'paradasService', 'leafletHelper',
    function MapController($scope, $log, $state, locationService, paradasService, leafletHelper) {
      var vm = this;

      vm.position = {};
      vm.positionMarker = {};
      vm.accuracyCircle = {};
      vm.map = {};
      vm.locate = locate;
      vm.watchLocation = watchLocation;
      vm.traking = false;

      $scope.$on('track-position', function(event, tracking) {
        updateTracking(tracking);
      })

      $scope.$on('new-stop', function(event, tracking) {
        var params = {
          position: vm.position
        }

        if (!vm.tracking) {
          params.accuracy = 0;
        } else {
          params.accuracy = vm.position.accuracy;
        }

        $state.go('app.wizard.step1', params);
      })

      $scope.$on('$destroy', function() {
        if (vm.tracking) {
          locationService.unWatch(vm.watchId);
        }
        document.removeEventListener('resume', onResume);
        document.removeEventListener('pause', onPause);
      });

      document.addEventListener('resume', onResume);
      document.addEventListener('pause', onPause);

      function locate() {
        vm.map.panTo(new L.LatLng(vm.position.lat, vm.position.lng), {
          animate: true,
          duration: 0.5
        });
      }

      function updateTracking(tracking) {
        vm.tracking = tracking;
        if (vm.tracking) {
          vm.watchLocation();
        } else {
          locationService.unWatch(vm.watchId);
          vm.map.removeLayer(vm.accuracyCircle);
        }
      }

      function watchLocation() {
        vm.watchId = locationService.watch(function onWatch(data) {
          vm.position = data;
          vm.positionMarker.setLatLng([data.lat, data.lng]);
          vm.accuracyCircle.setLatLng([data.lat, data.lng]).setRadius(data.accuracy).addTo(vm.map);
          locate();
        });
      }

      function onResume() {
        if (vm.tracking) {
          vm.watchLocation();
        }
      }

      function onPause() {
        if (vm.tracking) {
          locationService.unWatch(vm.watchId);
        }
      }

      (function createMap() {
        locationService.locate().then(onSuccess);

        function mapParadas() {
          paradasService.list().then(function(data) {
            data.forEach(function(element) {
              var coords = [element.lat, element.lng];
              L.marker(coords, { clickable: true, draggable: false })
                .addTo(vm.map)
                .on('click', function(e) {
                  $state.go('app.detail', { paradaID: element.id });
                });
            });

          });
        }

        function onSuccess(data) {
          vm.position = data;
          leafletHelper.createMap('map', { center: L.latLng(data.lat, data.lng) }, 'main')
            .then(function(map) {
              vm.map = map;

              vm.map.on('zoomend', function() {
                if (vm.tracking) {
                  locate();
                }
              });

              leafletHelper.createCssMarker('map', data, 'position')
                .then(function(marker) {
                  vm.positionMarker = marker;
                });

              vm.accuracyCircle = L.circle([data.lat, data.lng], 0, { fillColor: '#4285F4', fillOpacity: 0.2, color: '#4285F4', weight: 1 }).addTo(vm.map);

              mapParadas();
            });
        }
      })();
    }
  ]);
