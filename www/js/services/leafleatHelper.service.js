angular.module( 'services').factory('leafleatHelper', function($q) {

   function getMarkerAT(latlng) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

   return {
      getMarkerAT: getMarkerAT 

});