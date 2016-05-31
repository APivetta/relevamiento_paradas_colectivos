angular.module('services').factory('paradasService', function($q, $http) {

  var cache = [];

  list().then(function() { console.log('PARADAS SERVICE CACHE LOADED!') })

  function get(_id) {
    var promise = $q(function(success, fail) {

      if (cache.length == 0) {
        list().then(function() {
          searchCacheFor(_id);
        })
      } else {
        searchCacheFor(_id);
      }


      function searchCacheFor(_id) {

        function find(element) {

          return (element.id == _id);
        }
        var result = cache.filter(find)[0];
        if (result !== undefined) { success(result); } else { fail(undefined); }
      }

    });
    return promise;
  }

  function put() {
    console.log("paradas service put ")
  }

  function post() {
    console.log("paradas service post ")
  }

  function list() {
    var promise = $q(function(success, fail) {

      $http({
        method: 'GET',
        //url: 'mock/paradas_viejas.geojson'
        url: 'mock/paradas.geojson'
      }).then(queryOk, fail);


      function queryOk(data) {

        cache = prepare(data.data.features);
        success(cache);
      }


    });



    return promise;
  }


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
      })
    });

    return out;
  }

  return {
    get: get,
    put: put,
    post: post,
    list: list
  }

});
