'use strict';

pkmApp.controller('mainCtrl', function($scope, getData) {
  // $scope.masterList = {};
  getData.masterList().then(function(response){
    $scope.masterlist = response.data;
    console.log($scope.masterlist);
  });

  $scope.getPkm = function(id){
    console.log(id);
    getData.getGen(id).then(function(response){
      $scope.pkmData = response.data;
      $scope.pkmType = response.data.types;
      $scope.pkmStat = response.data.stats;      
    }, function(error){
        $scope.status1 = 'unable to load data: ' + error.message;
    });
    getData.getDesc(id).then(function(response){
      $scope.pkmEntry = response.data.flavor_text_entries;
      $scope.pkmSpecies = response.data.genera;
    }, function(error){
        $scope.status2 = 'unable to load data: ' + error.message;
      });
  };









});
