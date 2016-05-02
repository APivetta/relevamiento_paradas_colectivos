'use strict';
angular.module('modules')
    .controller('WizardStepOneController', ['$scope','$log', '$state', '$cordovaDevice', 'leafletData', 'wizardService','locationService', WizardStepOneController]);


function WizardStepOneController($scope,$log, $state, $cordovaDevice, leafletData, wizardService,locationService) {
    var vm = this;

    vm.ready = false;


    wizardService.start();
    vm.fields = wizardService.fields;

    //map 
    var positionMarker = {} ;
    var accuracyCircle = {} ;
    createMap();

    vm.$state = $state;

    vm.next = next;
    vm.locate = locate;
    vm.createMap = createMap;
    vm.keyboardSubmit = keyboardSubmit;




    /////////

    function keyboardSubmit($event) {
        $event.preventDefault();
        alert('hello my friend');


    }

    function next() {
        //alert('hello my friend'); 
        $state.go('app.wizard.step2');
    }

    function locate(){
        alert('need some direction ? ');
        locationService.locate().then(onSuccess,onFail);
        function onSuccess (data){
            positionMarker.setLatLng([data.lat,data.lng])
            accuracyCircle.setLatLng([data.lat,data.lng]).setRadius(data.accuracy);
            vm.fields.correccion = false ;
        };

        function onFail    (error){

        };

    }

    function createMap() {

        locationService.locate().then(onSuccess,onFail);
        function onSuccess(data){
            var map = L.map('step1Map').setView([data.lat,data.lng],16);
            
            vm.fields.coordenadas  = '( '+data.lat+','+data.lng+' )'
            vm.fields.correccion = false ; 
            vm.fields.precision = data.accuracy ; 
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            positionMarker = L.marker([data.lat,data.lng],{draggable:true}).addTo(map)
                .bindPopup('Posicion actual \nprecision: '+data.accuracy+" mts")
                .openPopup();


            accuracyCircle = L.circle([data.lat,data.lng], data.accuracy,{fillColor:'#03f',fillOpacity:.2,color:'#03f',weight:2}).addTo(map);
            //L.Control.geocoder().addTo(map);

            positionMarker.on('drag',function(e){
                vm.fields.coordenadas =  '('+positionMarker.getLatLng().lat+','+positionMarker.getLatLng().lng+')';
                accuracyCircle.setLatLng(positionMarker.getLatLng())
               //console.log(positionMarker.getLatLng());
               $scope.$apply()
                if ( !vm.fields.correccion  )
                   { vm.fields.correccion = true ;} 
              });
            
        };
        function onFail(error){
            alert(error);
        };

    }

    $log.log('Hello from your Controller: WizardStepOneController in module main:. This is your controller:', this);

}
