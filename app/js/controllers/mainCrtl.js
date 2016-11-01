'use strict';

pkmApp.controller('mainCtrl', function($scope, getData, choose, manipulateString, compute) {
  $scope.stateMain = 0;
  $scope.moveCategory = choose.moveCategory();
  $scope.typeColor = 'dark';

  $scope.changeMenuMain = function(state){$scope.stateMain = state;};
  getData.masterList().then(function(response){
      var list = response.data;
      $scope.masterlist = list;
  });

  $scope.getPkm = function(id, idStr, name, sprite, form){
    $scope.id = idStr;
    $scope.name = name;
    $scope.sprite = sprite;
    $scope.form = form;

    getData.getBasic(idStr).then(function(response){
      $scope.entry = response.data;    
      $scope.typeColor = response.data.Type[0].toLowerCase();
      $scope.stats = response.data.stats;
      $scope.moves = response.data.moves;  
      $scope.weight = manipulateString.clearBracket(response.data.Weight);
      $scope.height = manipulateString.clearBracket(response.data.Height); 
      $scope.displayMoves = {};
      $scope.moveDetail = {};
      $scope.evolution = {};
      $scope.evolState = "1";

      getData.getEvol().then(function(response){
        var evolData = response.data;

        for(var i = 0; i < evolData.length; i ++ ){
          for(var j = 0; j < evolData[i].members.length; j ++) {
            var member = evolData[i].members[j];
            if(member == $scope.name.toLowerCase()){

              var treeLength = compute.objectLength(evolData[i].tree);

              if(member == 'eevee' || member == 'vaporeon' || member == 'jolteon' || member == 'flareon' || member == 'sylveon' || member == 'espeon' || member == 'umbreon' || member == 'leafeon' || member == 'glaceon') {
                
                $scope.evolState = 'eevee';
                $scope.evolution = evolData[i].tree;

              } else if(treeLength == 3){
                
                $scope.evolState = treeLength;
                $scope.evolution = evolData[i].tree;

              } else if (treeLength == 2){
                $scope.evolState = treeLength;
                $scope.evolution = evolData[i].tree;
              }
              break;
            } 
          };
        };
    });

      $scope.choseMoveSet = function(category){
        $scope.displayMoves = choose.chooseMoveSet(category, $scope.entry);
        $scope.selectedMoveCategory = category + " Moves";
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