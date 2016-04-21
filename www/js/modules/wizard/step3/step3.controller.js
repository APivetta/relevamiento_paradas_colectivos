'use strict';
angular.module('modules')
  .controller('WizardStepThreeController', ['$log', '$state', 'CameraService', WizardStepThreeController]);


function WizardStepThreeController($log, $state, CameraService) {
  var vm = this;


  vm.picture = '';
  vm.takePicture = takePicture;
  vm.next = next;

  /////////////////////////////
  function takePicture() {

    var options = {
      quality: 75,
      //targetWidth: 400,
      //targetHeight: 200,
      sourceType: 1
    };

    CameraService.getPicture(options).then(function(imageData) {
      vm.picture = imageData;
    }, function(err) {
      console.log(err);
    });

  };
  vm.$state = $state;

  function next() {
    $state.go('detail');
  }


  $log.log('Hello from your Controller: WizardStepThreeController in module main:. This is your controller:', this);

}
