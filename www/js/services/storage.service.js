angular.module( 'services').factory('storageService', function($q) {
   //servicio destinado a admnistrar el alamcenamiento de datos en el servidor , tanto cuando la coneccion a internet esta disponible o no 
   
   function saveRegister(argument) {
      // body...
   }

   return {
      saveRe: saveRegister,
      registerStatus: registerStatus,
      getPendent:getPendent

});