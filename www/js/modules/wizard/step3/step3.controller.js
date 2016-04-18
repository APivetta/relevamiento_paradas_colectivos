'use strict';
angular.module('modules')
.controller('WizardStepThreeController', ['$log', '$state','$cordovaDevice',WizardStepThreeController]);


function WizardStepThreeController($log,$state, $cordovaDevice) {
		var vm = this;

		vm.map = {
			center : {}	
		};


		 
		vm.$state = $state ; 

	    navigator.geolocation.getCurrentPosition(function(pos) {
          
	    	vm.map.center = {
		        lat:pos.coords.latitude,
		        lng: pos.coords.longitude,
		        zoom: 8
		    } ; 
        
        }, function(error) {
          $log.log('Unable to get location: ' + error.message);
        });
     

     
  $log.log('Hello from your Controller: WizardStepThreeController in module main:. This is your controller:', this);

}
      
