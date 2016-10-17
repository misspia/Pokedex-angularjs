pkmApp.factory('getData', function($http){
	var baseUrl = 'http://pokeapi.co';
	var pkmID = 6;
  
  return{
    masterList: function() {
      return $http.get('../../../server/json/list.json');
    },
    getGen: function(id) {
      return $http.get(baseUrl + '/api/v2/pokemon/' + id);
    },
    getDesc: function(id) {
      return $http.get(baseUrl + '/api/v2/pokemon-species/' + id);
    }
  }; 
  	
});
