'use strict';
angular.module('services').factory('locationService', ['$q',
  function locationService($q) {


    var geolocationOptions = {
      maximunAge: 3000,
      setTimeout: 10000,
      enableHighAccuracy: true
    };

    function locate() {
      var promise = $q(function locatePromise(success, fail) {

        function onSuccess(position) {
          var location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };

          success(location);
        }

        function onError(error) {
          console.log('location service failed!!! \ncode: ' + error.code + '\n' + 'message: ' + error.message + '\n');
          fail(error);
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, geolocationOptions);

      });

      return promise;
    }

    return {
      locate: locate
    };

  }
]);
