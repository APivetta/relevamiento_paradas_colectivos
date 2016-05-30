angular.module( 'services').factory('networkService', ['$q',networkService]);


function networkService ($q) {

   function getStatus(){
      var promise = $q(function (success,fail){
           var networkState = navigator.connection.type;
            console.log('Connection type: ' + networkState);
            success(networkState);
      });

      return promise;
   }

   function subscribe(evento,callback){
      var promise = $q(function (success,fail){

         document.addEventListener(evento, callback, false);
         success(true)
      });

      return promise;
   }


   return {
      getStatus : getStatus,
      subscribe : subscribe
   }

}



// function checkConnection() {
//     var networkState = navigator.connection.type;

//     var states = {};
//     states[Connection.UNKNOWN]  = 'Unknown connection';
//     states[Connection.ETHERNET] = 'Ethernet connection';
//     states[Connection.WIFI]     = 'WiFi connection';
//     states[Connection.CELL_2G]  = 'Cell 2G connection';
//     states[Connection.CELL_3G]  = 'Cell 3G connection';
//     states[Connection.CELL_4G]  = 'Cell 4G connection';
//     states[Connection.CELL]     = 'Cell generic connection';
//     states[Connection.NONE]     = 'No network connection';

//     alert('Connection type: ' + states[networkState]);
// }
