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

    function watch(cb, err) {
      function onSuccess(position) {
        var location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };

        cb(location);
      }
      return navigator.geolocation.watchPosition(onSuccess, err, geolocationOptions);
    }

    function unWatch(watchID) {
      navigator.geolocation.clearWatch(watchID);
    }

    return {
      locate: locate,
      watch: watch,
      unWatch: unWatch
    };

  }
]);
