'use strict';
angular.module('services').factory('paradasService', function($q, $http) {

  var cache = [];

  function prepare(input) {
    var out = [];

    input.forEach(function(ele) {
      out.push({
        id: ele.properties.id,
        calle: ele.properties.calle,
        numero: ele.properties.numero,
        coordenadas: ele.geometry.coordinates[0][1] + ',' + ele.geometry.coordinates[0][0],
        lat: ele.geometry.coordinates[0][1],
        lng: ele.geometry.coordinates[0][0],
        paridad: ele.properties.paridad,
        entre1: ele.properties.entre1,
        entre2: ele.properties.entre2,
        capacidad: ele.properties.capacidad,
        observcaciones: ele.properties.obs,
        tipo: ele.properties.familia,
        estado: ele.properties.subtipo
      });
    });

    return out;
  }

  function list() {
    var promise = $q(function(success, fail) {
      function queryOk(data) {

        cache = prepare(data.data.features);
        success(cache);
      }

      $http({
        method: 'GET',
        //url: 'mock/paradas_viejas.geojson'
        url: 'mock/paradas.geojson'
      }).then(queryOk, fail);
    });

    return promise;
  }

  function get(_id) {
    var promise = $q(function(success, fail) {

      function searchCacheFor(_id) {

        function find(element) {

          return (element.id === _id);
        }
        var result = cache.filter(find)[0];
        if (result !== undefined) { success(result); } else { fail(undefined); }
      }

      if (cache.length === 0) {
        list().then(function() {
          searchCacheFor(_id);
        });
      } else {
        searchCacheFor(_id);
      }

    });
    return promise;
  }

  function put() {
    console.log('paradas service put ');
  }

  function post() {
    console.log('paradas service post ');
  }

  list().then(function() {
    console.log('PARADAS SERVICE CACHE LOADED!');
  });

  return {
    get: get,
    put: put,
    post: post,
    list: list
  };

});
