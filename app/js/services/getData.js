pkmApp.factory('getData', function($http){
	var baseUrl = 'http://pokeapi.co';
	var pkmID = 6;
  
  return{
    getGen: function() {
      return $http.get(baseUrl + '/api/v2/pokemon/' +pkmID);
    },
    getDesc: function() {
      return $http.get(baseUrl + '/api/v2/pokemon-species/' +pkmID);
    } 
  }; 
  	
});
