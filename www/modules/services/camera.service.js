angular.module('services').factory('cameraService', function($q) {

  var pictures = [];

  function flush() {
    picture = [];
    //eleminar del espacio temporal todas las imagenes
  }


  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function deleteByID(id) {
    var promise = $q(function(success, fail) {


      // delete pictures[id];
      var index = -1;
      for (var i = pictures.length - 1; i >= 0; i--) {
        if (pictures[i].id == id)
          index = i;
      }

      if (index !== -1) {
        //delete pictures[index];
        pictures.splice(index, 1);
        //eleminar del espacio temporal la imagen
        success(true);
      } else {
        fail(false)
      }

    });

    return promise;
  }

  function getPicture(options) {
    var q = $q.defer();


    if (navigator.camera == undefined) {
      //mock picture
      var temp = getRandomArbitrary(11111111, 99999999);
      var mock = {
        title: "Mock title",
        src: 'mock/img/' + Math.floor(Math.random() * 4) + '.png',
        id: temp,
        subtitle: new Date()
      };

      pictures.push(mock);
      q.resolve(undefined);
    } else {
      navigator.camera.getPicture(function(result) {
        var temp = getRandomArbitrary(11111111, 99999999);
        pictures.push({
          title: "mock title",
          src: result,
          id: temp,
          subtitle: new Date()
        });


        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
    }

    return q.promise;
  }

  return {
    pictures: pictures,
    getPicture: getPicture,
    flush: flush,
    deleteByID: deleteByID
  }

});
