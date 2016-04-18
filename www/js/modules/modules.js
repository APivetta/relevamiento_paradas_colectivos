'use strict';
angular.module('modules', [
    'ionic',
    'ngCordova',
    'ui.router',
    'leaflet-directive'

  ])
  .config(function($stateProvider, $urlRouterProvider) {




    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/map');
    $stateProvider

      .state('map', {
        'url': '/map',
        'templateUrl': 'js/modules/map/map.tmpl.html',
        'controller': 'MapController as vm'
      })
      .state('search', {
        'url': '/search',
        'templateUrl': 'js/modules/search/search.tmpl.html',
        'controller': 'SearchController as vm'
      })
      .state('detail', {
        'url': '/detail',
        'templateUrl': 'js/modules/detail/detail.tmpl.html',
        'controller': 'DetailController as vm'
      })
      .state('wizard', {
        url: '/wizard',
        abstract:true,
        templateUrl: 'js/modules/wizard/wizard.tmpl.html'
        
      })
      .state('wizard.step1', {
        url: '/step1',
        views: {
          'step-view': {
            templateUrl: 'js/modules/wizard/step1/step1.tmpl.html',
            controller: 'WizardStepOneController as vm'
          }
        }

      })
      .state('wizard.step2', {
        url: '/step2',
        'views': {
          'step-view': {
            'templateUrl': 'js/modules/wizard/step2/step2.tmpl.html',
            controller : 'WizardStepTwoController as vm'
            
   
          }
        }
      })
      .state('wizard.step3', {
        'url': '/step3',
        'views': {
          'step-view': {
            'templateUrl': 'js/modules/wizard/step3/step3.tmpl.html',
            controller :'WizardStepThreeController as vm'
  

          }
        }
      });
  });
