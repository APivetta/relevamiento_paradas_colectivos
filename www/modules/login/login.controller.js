'use strict';
angular.module('modules')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('login', {
      'url': '/login',
      'templateUrl': 'modules/login/login.tmpl.html',
      'controller': 'LoginController as vm'
    });
  }])
  .controller('LoginController', ['$log', '$state', 'networkService', LoginController]);

function LoginController($log, $state, networkService) {
  var vm = this;

  vm.user = {
    name: "usuarioModelo",
    pass: "12345678"
  };

  vm.login = login;

  // $cordovaSplashscreen.show();
  // console.log($cordovaSplashscreen);
  //networkService.getStatus().then(handleNetwork);

  function handleNetwork(networkType) {

    vm.network = networkType;

    // si la red no esta conectada  == {none }
    //loguear contra base local de usuarios 
  }

  function login() {
    $state.go('app.map');
  }

  $log.log('Hello from your Controller: LoginController in module main:. This is your controller:', this);

}
