'use strict';
angular.module('services').factory('userService', [
  function userService() {
    //servicio destinado a admnistrar el alamcenamiento de datos en el servidor , tanto cuando la coneccion a internet esta disponible o no 

    function login(data) {
      console.log(data);
      // check connection
      // si hay coneccion
      //loguear contra servidor
      //storear info del usuario
      //storear campana del usuario
      //storear paradas de las campana del usuario
      //sino loguear contra storage
      //leer campana
      //leer paradas
    }

    function logout() {}

    function getInfo() {}

    return {
      login: login,
      logout: logout,
      getInfo: getInfo
    };

  }
]);
