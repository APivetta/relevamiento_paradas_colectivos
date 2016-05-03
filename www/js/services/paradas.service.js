angular.module( 'services').factory('paradasService', function($q,$http) {

   var active = false ; 
   var fields = {} ; 

   var picture = {} ;

   function start(){

   }


   function blanck(){}


   function store(callBack){

      //do the storing thing and callback
      callBack();
   }

   function get  () {
      console.log("paradas service get")
   }
   function put  () {
      console.log("paradas service put ")
   }
   function post () {
      console.log("paradas service post ")
   }
   function list () {
 
      var promise = $http({
            method: 'GET',
            url: 'mock/paradas.geojson'
      });
      

      return promise;   
   }

   return {
      get  : get,
      put  : put,
      post : post,
      list : list
   }

});