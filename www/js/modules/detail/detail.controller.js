'use strict';
angular.module('modules')
.controller('DetailController', ['$log', '$state','$stateParams','$cordovaDevice', '$cordovaGeolocation','paradasService','leafletHelper',DetailController]);


function DetailController($log,$state,$stateParams, $cordovaDevice,$cordovaGeolocation,paradasService,leafletHelper) {
		var vm = this;

		vm.map = {};
		vm.marker = {} ;
		vm. fields  = {}
        
        vm.fields.id = $stateParams.paradaID;
		
        paradasService.get($stateParams.paradaID).then(paradaFounded,paradaDontFound)

        function paradaFounded(data){
        	console.log(JSON.stringify(data));

        	leafletHelper.createMap('detailMap',data,'detalle').then(function(map){
        		vm.map = map ; 
        	});
        	leafletHelper.createMarker('detailMap',data,'simple').then(function(marker){
        		vm.marker = marker ; 
        	});

        	vm.fields = data; 
        }
        function paradaDontFound(error){
        	console.log(error);
        }

		//
    
    console.log($stateParams)


    vm.showMe = function (){
    	console.log(JSON.stringify(vm.fields ))
    }

  $log.log('Hello from your Controller: DetailController in module main:. This is your controller:', this);

}
      



//