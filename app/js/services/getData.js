pkmApp.factory('getData', function($http){
	var baseUrl = 'http://pokeapi.co';
	var pkmID = 3;
  
  	return{
    getPkms: function() {
      return $http.get(baseUrl + '/api/v2/pokemon/');
    },
    getPkm: function() {
      return $http.get(baseUrl + '/api/v2/pokemon/' +pkmID);
    }
  }; 
  	
});






















  // 	$http.get(baseUrl + "/api/v2/pokemon/" + pkmID).then(function (response) {
      
  //     $scope.pokeData = response.data;
  //     $scope.pokeType = response.data.types;
  //     $scope.pokeStat = response.data.stats;


  // });

  //   $http.get(baseUrl + "/api/v2/pokemon-species/" +pkmID).then(function(response){
  //   $scope.pokeEntry = response.data.flavor_text_entries; //flavor_text_entries is the description
  //   $scope.pokeSpecies = response.data.genera;
  // });