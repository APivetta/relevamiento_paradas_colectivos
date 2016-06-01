'use strict';
angular.module('services').factory('storageService', [
  function storageService() {
    //servicio destinado a admnistrar el alamcenamiento de datos en el servidor , tanto cuando la coneccion a internet esta disponible o no 

    function saveRegister() {
      // body...
    }

    function registerStatus() {}

    function getPendent() {}

    function login() {}

    function saveUserData() {}

    function saveCampaindata() {}

    return {
      saveRegister: saveRegister,
      registerStatus: registerStatus,
      getPendent: getPendent,
      login: login,
      saveUserData: saveUserData,
      saveCampaindata: saveCampaindata
    };

  }
]);
