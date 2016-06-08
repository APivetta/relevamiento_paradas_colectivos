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

      $log.log('Hello from your Controller: MapController in module main:. This is your controller:', this);

      $scope.$on('track-position', function(event, tracking) {
        console.log(tracking);
        updateTracking(tracking);
      })

      $scope.$on('$destroy', function() {
        locationService.unWatch(vm.watchId);
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

      function stopTracking() {
        vm.map.removeLayer(vm.accuracyCircle);
        updateTracking(false);
        $scope.$emit('stop-tracking');
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

              vm.map.on('dragstart', stopTracking);

              vm.map.on('zoomend', function() {
                if (vm.tracking) {
                  locate();
                }
              });

              leafletHelper.createCssMarker('map', data, 'position')
                .then(function(marker) {
                  vm.positionMarker = marker;
                  vm.positionMarker.on('dragstart', stopTracking);
                });

              vm.accuracyCircle = L.circle([data.lat, data.lng], 0, { fillColor: '#4285F4', fillOpacity: 0.2, color: '#4285F4', weight: 1 }).addTo(vm.map);

              mapParadas();
            });
        }
      })();
    }
  ]);
