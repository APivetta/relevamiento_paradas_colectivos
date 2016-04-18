'use strict';
angular.module('modules')
.controller('MapController', ['$log', '$state','$cordovaDevice', '$cordovaGeolocation',MapController]);


function MapController($log,$state, $cordovaDevice,$cordovaGeolocation) {
		var vm = this;

		vm.map =  {
			center: {},
			markers:{}
		};
		
     	vm.openWizard = function (){
			$state.go('wizard.step3');
     	}



     	vm.locate = function(){



navigator.geolocation.getCurrentPosition(function(data){
  console.log(data);
});


        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
          	vm.map.center.lat  = position.coords.latitude;
            vm.map.center.lng = position.coords.longitude;
            vm.map.center.zoom = 15;

           vm.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };

  $log.log('Hello from your Controller: MapController in module main:. This is your controller:', this);

}
      
