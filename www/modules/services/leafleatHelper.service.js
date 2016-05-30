angular.module( 'services').factory('leafletHelper', function($q) {


   var map    = [] ;
   var marker = [] ; 
   var paths  = [] ;

   var preset = {
      map:{
         paradas : {
                      zoom : 16,
                 tileLayer : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
               attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         },
         detalle: {
                      zoom : 18,
                 tileLayer : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
               attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            
         }
      },
      marker : {
         simple:{
            draggable:false
         }

      }
   };


var actions = {
   marker : {

   }
}
   

   function createMap(id,data,type) {
         var promise = $q(function(success,fail){
         
         map[id] =  L.map(id).setView([data.lat,data.lng],preset.map[type].zoom);
         L.tileLayer(preset.map[type].tileLayer, {
            attribution: preset.map[type].attribution
         }).addTo(map[id]);
         
         success(map[id]);

         });

         return promise;
      }
   
   function createMarker(mapID,data,type){
      var promise = $q(function(success,fail){
         var tempMarker = L.marker([data.lat,data.lng],preset.marker[type]).addTo(map[mapID]);
         marker[data.id] = tempMarker;

         success(tempMarker); 
      });
       return promise;   
   }

   return {
      createMap    : createMap ,
      createMarker : createMarker 
   };
});
