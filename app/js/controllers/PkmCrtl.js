'use strict';

pkmApp.controller('PkmCtrl', function($scope, getData) {
  
  getPkm();

  function getPkm(){
    getData.getGen()
      .then(function (response){
          $scope.pkmData = response.data;
          $scope.pkmType = response.data.types;
          $scope.pkmStat = response.data.stats;
      }, function(error){
        $scope.status1 = 'unable to load data: ' + error.message;
      });
    getData.getDesc()
      .then(function(response){
        $scope.pkmEntry = response.data.flavor_text_entries;
        $scope.pkmSpecies = response.data.genera;
      }), function(error){
        $scope.status2 = 'unable to load data: ' + error.message;
      }
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


