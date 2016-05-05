angular.module( 'services').factory('cameraService', function($q) {

   var pictures = [] ; 


   return {
      pictures : pictures,
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {

            pictures.push({
               src : result,
               title : "mock title",
               subtitle : new Date()
            });
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

});