angular.module( 'services').factory('wizardService', function($q) {

   var active = false ; 
   var fields = {} ; 

   var picture = {} ;

   function start(){
      active = true ;
      fields = {} ; 

   }


   function blanck(){}


   function store(callBack){

      //do the storing thing and callback
      callBack();
   }

   return {
      start:start,
      fields : fields,
      picture : picture,
      store : store
   }

});