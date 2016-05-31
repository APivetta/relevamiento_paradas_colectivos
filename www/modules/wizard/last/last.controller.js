'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.wizard.lastStep', {
      url: '/confirmacion',
      views: {
        'step-view': {
          templateUrl: 'modules/wizard/last/last.tmpl.html',
          controller: 'WizardLastStepController as vm'
        },
        'step-three-fab': ''
      }
    });
  }])
  .controller('WizardLastStepController', ['$log', '$state', 'cameraService', 'wizardService', WizardLastStepController]);


function WizardLastStepController($log, $state, wizardService, cameraService) {
  var vm = this;

  vm.fields = wizardService.fields;
  vm.pictures = cameraService.pictures;


  /////////////////////////////

  vm.$state = $state;

  function next() {
    $state.go('detail');
  }


  $log.log('Hello from your Controller: WizardLastStepController in module main:. This is your controller:', this);

}
