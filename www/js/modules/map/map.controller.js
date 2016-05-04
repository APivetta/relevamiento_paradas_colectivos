'use strict';
angular.module('modules')
.controller('MapController', ['$log', '$state','$cordovaDevice', '$cordovaGeolocation','locationService','paradasService',MapController]);


function MapController($log,$state, $cordovaDevice,$cordovaGeolocation,locationService,paradasService) {
		var vm = this;

    vm.positionMarker = {} ;
    vm.map = { } ; 
      createMap();
      vm.openWizard = openWizard; 
      vm.locate = locate;

     	function openWizard (){
  			$state.go('app.wizard.step1');


     	}


      function createMap(){
        locationService.locate().then(onSuccess,onFail);

        function onSuccess (data){
          vm.map = L.map('map').setView([data.lat,data.lng],16);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.map);

            vm.positionMarker = L.marker([data.lat,data.lng],{draggable:true}).addTo(vm.map)
                .bindPopup('Posicion actual \nprecision: '+data.accuracy+" mts")
                .openPopup();

            mapParadas();
        };

        function onFail    (error){

        };


        function mapParadas(){
          paradasService.list().then(function (data){

            console.log(data);
            data.forEach(function (element,index){
              
              var coords = [element.lat,element.lng];


            //L.circle(coords,5).addTo(vm.map)

            L.marker(coords,{clickable:true,draggable:false})
              .addTo(vm.map)
              .on('click',function(e){
                console.log(e);
                console.log(element.properties);
                $state.go('app.detail',{paradaID:element.id})
              });
            });



          });
        }

      }

     	function locate(){

        // navigator.geolocation.getCurrentPosition(function(data){
        //   console.log(data);
        // });




      };

  $log.log('Hello from your Controller: MapController in module main:. This is your controller:', this);

}
      
