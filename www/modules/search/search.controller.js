'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('app.search', {
      url: '/buscar',
      views: {
        'viewContent': {
          'templateUrl': 'modules/search/search.tmpl.html',
          controller: 'SearchController as vm'
        },
        'fabContent': ''
      }
    });
  }])
  .controller('SearchController', ['$log', '$state', '$cordovaDevice', '$cordovaGeolocation', SearchController]);


function SearchController($log, $state, $cordovaDevice, $cordovaGeolocation) {
  var vm = this;
}
