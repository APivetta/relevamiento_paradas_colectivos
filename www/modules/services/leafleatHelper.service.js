'use strict';
angular.module('services').factory('leafletHelper', function($q) {

  var map = [];
  var marker = [];
  var paths = [];

  var tilesResources = {
    osm: {
      layer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  };

  var bounds = {
    caba: L.latLngBounds(L.latLng(-34.710125, -58.540210), L.latLng(-34.530646, -58.323625))
  };

  var preset = {
    map: {
      main: {
        tileLayer: tilesResources.osm.layer,
        attribution: tilesResources.osm.attribution,
        options: {
          zoom: 16,
          minZoom: 11,
          maxBounds: bounds.caba
        }
      },
      detalle: {
        tileLayer: tilesResources.osm.layer,
        attribution: tilesResources.osm.attribution,
        options: {
          zoom: 18,
          minZoom: 15,
          maxBounds: bounds.caba
        }
      }
    },
    marker: {
      simple: {
        draggable: false
      }

    }
  };


  var actions = {
    marker: {

    }
  }


  function createMap(id, opts, type) {
    var promise = $q(function(success, fail) {

      var options = angular.extend({}, preset.map[type].options, opts);

      map[id] = L.map(id, options);

      L.tileLayer(preset.map[type].tileLayer, {
        attribution: preset.map[type].attribution
      }).addTo(map[id]);

      success(map[id]);

    });

    return promise;
  }

  function createMarker(mapID, data, type) {
    var promise = $q(function(success, fail) {
      var tempMarker = L.marker([data.lat, data.lng], preset.marker[type]).addTo(map[mapID]);
      marker[data.id] = tempMarker;

      success(tempMarker);
    });
    return promise;
  }

  return {
    createMap: createMap,
    createMarker: createMarker
  };
});
