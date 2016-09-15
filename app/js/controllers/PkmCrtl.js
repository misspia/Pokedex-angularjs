'use strict';

pkmApp.controller('PkmCtrl', function($scope, getData) {
  
  getPkm();

  function getPkm(){
    getData.getPkm()
      .then(function (response){
          $scope.pkmName = response.data.name;
      }, function(error){
        $scope.status = 'unable to load pokemon data: ' + error.message;
      });
  }








});


  // $http.get(baseUrl + "/api/v1/pokemon").then(
  //   function ConvertJSON(response){
  //     //gets total number of pokemon entries in the database      
  //     // $scope.totalPkm = response.data.count; total is 721
  //     $scope.listPkm = [];
  //     $scope.listPkmId = [];
  //     $scope.pokeObj = {};

  //     // $scope.totalPkm should go where the '10' is (10 is just for testing otherwise
  //     // the loop would go to like 800)
  //     for (i = 1; i <= 10; i ++) {
  //       $scope.listPkmId.push(i);
  //       //loops through each pokemon ID  and pushes their name into $scope.listPkm
  //       $http.get(baseUrl + "/api/v2/pokemon/" + i).then(function(response){
  //         $scope.pokeObj[i] = response.data.name;
  //         $scope.listPkm.push(response.data.name);
          

  //         // vvv my attempt to store it into and object insteas lol didnt work
  //         // $scope.listPkm['id'] = i;
  //         // $scope.listPkm['name'] = response.data.name; 
  //       }); 
  //     }
  //     console.log($scope.listPkmId);
  //     console.log($scope.listPkm);
  //   });
  // var baseUrl = 'http://pokeapi.co';
  //   //temp pokemon ID
  // var pkmID = 3;
  // // $scope.pokeStat = '';
  //   var pokeApi = $http.get(baseUrl + "/api/v2/pokemon/" + pkmID).then(function (response) {
  //     $scope.pokeData = response.data;
  //     $scope.pokeType = response.data.types;
  //     $scope.pokeStat = response.data.stats;


  // });
  // // console.log($scope.pokeStat);


  // $http.get(baseUrl + "/api/v2/pokemon-species/" +pkmID).then(function(response){
  //   $scope.pokeEntry = response.data.flavor_text_entries; //flavor_text_entries is the description
  //   $scope.pokeSpecies = response.data.genera;
  // });