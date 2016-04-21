'use strict';
angular.module('modules')
.controller('DetailController', ['$log', '$state','$cordovaDevice', '$cordovaGeolocation',DetailController]);


function DetailController($log,$state, $cordovaDevice,$cordovaGeolocation) {
		var vm = this;

		vm.map =  {
			center: {},
			markers:{},
      fields: {},
		};

    vm.map.fields.name = "020323"
		
    
    

  $log.log('Hello from your Controller: DetailController in module main:. This is your controller:', this);

}
      
