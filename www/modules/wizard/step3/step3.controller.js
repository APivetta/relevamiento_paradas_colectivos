'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.wizard.step3', {
      url: '/paso3',
      views: {
        'step-view': {
          templateUrl: 'modules/wizard/step3/step3.tmpl.html',
          controller: 'WizardStepThreeController as vm'
        },
        'step-three-overlay': {
          templateUrl: 'modules/wizard/step3/overlay.tmpl.html',
          controller: 'WizardStepThreeOverlayController as vm'
        },
        'step-three-fab': {
          templateUrl: 'modules/wizard/step3/fab.tmpl.html',
          controller: 'WizardStepThreeFabController as vm'
        }
      }
    });
  }])
  .controller('WizardStepThreeController', ['$scope', '$log', '$state', 'cameraService',
    function WizardStepThreeController($scope, $log, $state, cameraService) {
      var vm = this;


      vm.pictures = cameraService.pictures;
      // vm.takePicture = takePicture;
      vm.next = function next() {
        $state.go('app.wizard.lastStep');
      };
      vm.deletePicture = cameraService.deleteByID;

      // $scope.$watch('vm.pictures',function(a){
      //   console.log(a);
      //   console.log('cammmmmbia todo cambiaaa');
      //   console.log(vm.pictures);
      // })

      vm.$state = $state;

      $log.log('Hello from your Controller: WizardStepThreeController in module main:. This is your controller:', this);

    }
  ]);
