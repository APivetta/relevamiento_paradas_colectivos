'use strict';
angular.module('modules')
    .controller('LoginController', ['$log', '$state', '$cordovaDevice', '$cordovaGeolocation', LoginController]);


function LoginController($log, $state, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    vm.user = {
        name: "usuarioModelo",
        pass: "12345678"
    };



    vm.login = login;


    function login() {
        $state.go('app.map');
    }




    $log.log('Hello from your Controller: LoginController in module main:. This is your controller:', this);

}
