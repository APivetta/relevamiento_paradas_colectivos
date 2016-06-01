'use strict';
angular.module('modules')
  .controller('WizardStepThreeFabController', ['$timeout', '$scope', '$log', '$state', '$cordovaDevice', '$cordovaGeolocation', 'cameraService',
    function MapFabButtonController($timeout, $scope, $log, $state, $cordovaDevice, $cordovaGeolocation, cameraService) {
      var vm = this;

      function takePicture() {

        var options = {
          quality: 75,
          //targetWidth: 400,
          //targetHeight: 200,
          sourceType: 1
        };

        cameraService.getPicture(options).then(function( /*imageData*/ ) {
          // vm.pictures.push({
          //     src: imageData,
          //     title: "testData",
          //     subtitle: new Date()
          // });

          console.log('picture taked');
          console.log(vm.pictures);

          $timeout(function() {

            $scope.$apply();
          }, 1000);


        }, function(err) {
          console.log(err);
        });

      }

      vm.pictures = cameraService.pictures;
      vm.takePicture = takePicture;

      $log.log('Hello from your Controller: MapFabButtonController in module main:. This is your controller:', this);

    }

  ]);
