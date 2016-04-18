'use strict';
angular.module('modules')
.controller('WizardStepOneController', ['$log', '$state','$cordovaDevice',WizardStepOneController]);


function WizardStepOneController($log,$state, $cordovaDevice) {
		var vm = this;

		vm.ready = false;
		vm.map = {
			center : {}	
		};

		vm.fields = {
			nombre : "" ,
			numero : ""
		}
		 
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
     

     
  $log.log('Hello from your Controller: WizardStepOneController in module main:. This is your controller:', this);

}
      
