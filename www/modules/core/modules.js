'use strict';
angular.module('modules', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ionMdInput',
    'leaflet-directive',
    'ionic-material',
    'ion-autocomplete'
  ])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'modules/menu/menu.tmpl.html',
        controller: function() {}
      });
  });
