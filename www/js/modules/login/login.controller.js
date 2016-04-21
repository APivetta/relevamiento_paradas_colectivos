'use strict';
angular.module('modules')
.controller('LoginController', ['$log', '$state','$cordovaDevice', '$cordovaGeolocation',LoginController]);


function LoginController($log,$state, $cordovaDevice,$cordovaGeolocation) {
		var vm = this;

		vm.map =  {
			user: "usuarioModelo",
			passwor:"1234567890"
		};
		
    
    

  $log.log('Hello from your Controller: LoginController in module main:. This is your controller:', this);

}
      
