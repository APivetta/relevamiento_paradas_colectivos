'use strict';
angular.module('modules', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ionMdInput',
    'ionic-material',
    'ion-autocomplete'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

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


      // alternatively, register the interceptor via an anonymous factory
      $httpProvider.interceptors.push(function($q) {
        return {
          // optional method
          'requestError': function(rejection) {
            console.log("requestError");
            return $q.reject(rejection);
          },

          // optional method
          'responseError': function(rejection) {
            // do something on error
            console.log("responseError");
            return $q.reject(rejection);
          }
        };
      });
    }
  ]);
