'use strict';
angular.module('modules')
.controller('WizardStepThreeController', ['$log', '$state','CameraService',WizardStepThreeController]);


function WizardStepThreeController($log,$state, CameraService) {
		var vm = this;

		vm.map = {
			center : {}	
		};
		    vm.picture = '' ;

   vm.takePicture = function () {
	
      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 1
      };

      CameraService.getPicture(options).then(function(imageData) {
         vm.picture = imageData;
      }, function(err) {
         console.log(err);
      });
		
   };		 
		vm.$state = $state ; 

	  

     
  $log.log('Hello from your Controller: WizardStepThreeController in module main:. This is your controller:', this);

}
      
