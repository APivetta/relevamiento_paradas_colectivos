'use strict';
angular.module('modules')
.controller('WizardStepOneController', ['$log', '$state','$cordovaDevice','leafletData','wizardService',WizardStepOneController]);


function WizardStepOneController($log,$state, $cordovaDevice,leafletData,wizardService) {
		var vm = this;

		vm.ready = false;

		vm.map = {
			center  : {},
			markers : {}
		};

    wizardService.start();
    vm.fields = wizardService.fields;
    
    locate ();

		vm.$state = $state ; 

     	vm.next   = next   ; 
     	vm.locate = locate ;
     	vm.keyboardSubmit = keyboardSubmit; 

     	/////////

     	function keyboardSubmit ($event) {
     		$event.preventDefault();
     		alert('hello my friend');


     	}

 		function next (){
 			//alert('hello my friend');	
			$state.go('app.wizard.step2');
     	}

     	function locate (){
     		navigator.geolocation.getCurrentPosition(function(position) {
          
	    	vm.map.center = {
		        lat:position.coords.latitude,
		        lng: position.coords.longitude,
		        zoom: 15
		    } ; 

           vm.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "Parada N",
              focus: true,
              draggable: true
            };
        
            	leafletData.getMap('step1Map').then(function(map) {
                   // L.marker().
                   console.log("GOT THE MAP");
                });


        }, function(error) {
          $log.log('Unable to get location: ' + error.message);
        });
     
     	}
	



     
  $log.log('Hello from your Controller: WizardStepOneController in module main:. This is your controller:', this);

}
      
