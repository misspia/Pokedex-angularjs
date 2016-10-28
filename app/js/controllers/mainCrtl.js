'use strict';

pkmApp.controller('mainCtrl', function($scope, getData, choose, manipulateString) {
  $scope.stateMain = 1;
  $scope.moveCategory = choose.moveCategory();

  $scope.changeMenuMain = function(state){$scope.stateMain = state;};
  getData.masterList().then(function(response){
      var list = response.data;
      $scope.masterlist = list;
  });

  $scope.getPkm = function(id, idStr, name, sprite){
    $scope.id = idStr;
    $scope.name = name;
    $scope.sprite = sprite;

    getData.getBasic(idStr).then(function(response){
      $scope.entry = response.data;    
      $scope.typeColor = response.data.Type[0].toLowerCase();
      $scope.stats = response.data.stats;
      $scope.moves = response.data.moves;  
      $scope.weight = manipulateString.clearBracket(response.data.Weight);
      $scope.height = manipulateString.clearBracket(response.data.Height); 
      $scope.displayMoves = {};
      $scope.moveDetail = {};

      console.log($scope.entry);

      $scope.choseMoveSet = function(category){
        $scope.displayMoves = choose.chooseMoveSet(category, $scope.entry);
      };

      $scope.getDetail = function(move, type, index) {
        $scope.moveDetail = getData.getDetail(move, type, index, $scope.displayMoves);
        getData.getDesc().then(function(response){
          $scope.moveDetail['description'] = manipulateString.matchKey(response.data, move);

        }, function(error){
            $scope.moveDetail['description'] = "No description available :("
        });
      };

    }, function(error){
        $scope.status1 = 'unable to load data: ' + error.message;
    });
  };
});