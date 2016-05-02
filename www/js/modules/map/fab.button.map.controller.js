'use strict';
angular.module('modules')
.controller('MapFabButtonController', ['$log', '$state','$cordovaDevice', '$cordovaGeolocation',MapFabButtonController]);


function MapFabButtonController($log,$state, $cordovaDevice,$cordovaGeolocation) {
		var vm = this;

	  vm.openWizard = openWizard; 
    

        

     	function openWizard (){
  			$state.go('app.wizard.step1');
     	}



  $log.log('Hello from your Controller: MapFabButtonController in module main:. This is your controller:', this);

}
      
