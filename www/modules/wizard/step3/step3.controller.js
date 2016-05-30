'use strict';
angular.module('modules')
  .controller('WizardStepThreeController', ['$scope','$log', '$state', 'cameraService', WizardStepThreeController]);


function WizardStepThreeController($scope,$log, $state, cameraService) {
  var vm = this;


  vm.pictures = cameraService.pictures;
  // vm.takePicture = takePicture;
  vm.next = next;
  vm.deletePicture =  cameraService.deleteByID;

// $scope.$watch('vm.pictures',function(a){
//   console.log(a);
//   console.log('cammmmmbia todo cambiaaa');
//   console.log(vm.pictures);
// })

  /////////////////////////////

  vm.$state = $state;

  function next() {
    $state.go('app.wizard.lastStep');
  }



  $log.log('Hello from your Controller: WizardStepThreeController in module main:. This is your controller:', this);

}
