'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.wizard.step2', {
      url: '/paso2',
      views: {
        'step-view': {
          templateUrl: 'modules/wizard/step2/step2.tmpl.html',
          controller: 'WizardStepTwoController as vm'
        },
        'step-three-fab': ''
      }
    })
  }])
  .controller('WizardStepTwoController', ['$log', '$state', '$cordovaDevice', 'wizardService', WizardStepTwoController]);

function WizardStepTwoController($log, $state, $cordovaDevice, wizardService) {
  var vm = this;

  vm.map = {
    center: {}
  };

  vm.$state = $state;
  vm.fields = wizardService.fields;

  vm.next = next;
  vm.getLineas = getLineas;

  vm.itemsClicked = itemsClicked;
  vm.itemsRemoved = itemsRemoved;
  vm.modelToItemMethod = modelToItemMethod;

  function next() {
    $state.go('app.wizard.step3');
  }

  function itemsClicked() {}

  function itemsRemoved() {}

  function getLineas() {
    return [
      { 'id': '1', 'label': 'linea 1' },
      { 'id': '2', 'label': 'linea 2' },
      { 'id': '3', 'label': 'linea 3' },
      { 'id': '4', 'label': 'linea 4' },
      { 'id': '5', 'label': 'linea 5' },
      { 'id': '6', 'label': 'linea 6' },
      { 'id': '7', 'label': 'linea 7' },
      { 'id': '8', 'label': 'linea 8' },
      { 'id': '9', 'label': 'linea 9' },
      { 'id': '10', 'label': 'linea 10' },
      { 'id': '11', 'label': 'linea 11' },
      { 'id': '12', 'label': 'linea 12' },
      { 'id': '13', 'label': 'linea 13' },
      { 'id': '14', 'label': 'linea 14' },

    ];
  }




  function modelToItemMethod(modelValue) {

    // get the full model item from the model value and return it. You need to implement the `getModelItem` method by yourself  
    // as this is just a sample. The method needs to retrieve the whole item (like the `items-method`) from just the model value. 
    var modelItem = [{ 'id': '7', 'label': 'linea 7' },
      { 'id': '8', 'label': 'linea 8' },
      { 'id': '9', 'label': 'linea 9' }
    ];

    return modelItem;
  }


  vm.externalModel = ['test1', 'test2', 'test3'];


  $log.log('Hello from your Controller: WizardStepTwoController in module main:. This is your controller:', this);

}
