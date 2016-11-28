pkmApp.factory('getData', function($http){
  var filepath = '../../app/json/';
	var pkmID = 6;
  var moveDetail = {};
  return{
    masterList: function() {
      return $http.get(filepath + 'list.json');
    },
    getBasic: function(id){
      return $http.get(filepath + "entry/entry-" + id + '.json');
    },
    getDesc: function(){
      return $http.get(filepath + "moves.json");
    },
    getEvol: function(){
      return $http.get(filepath + "evolution.json");
    },
    getDetail: function(move, type, index, displayMoves){
      moveDetail['move'] = move;
      moveDetail['type'] = type;

      var detail = {};
        for(var k in displayMoves){
          if(k.toLowerCase()  == 'move' || k.toLowerCase() == 'set' || k.toLowerCase() == 'title'){
            //do nothing
          } else{
            detail[k] = displayMoves[k][index];
          }
        };
        moveDetail['detail'] = detail;
        return moveDetail;
    }
  }; 	
});


pkmApp.factory('manipulateString', function(){
  return{
    clearBracket: function(string){
      var s = string;
       s = s.substring(0, s.indexOf('(')); 
       return s;
    },
    matchKey: function(obj, input) {
      for(var key in obj){
        if(key == input.toLowerCase()){
          var description = obj[key];
          return description;
        };
      };
    }
  };
});


pkmApp.factory('choose', function(getData){
  var displayMoves = {};
  var evolution = {};
  return{
    moveCategory: function(){
      category = ["Level Up", "Egg", "Tutor", "HM", "TM", "Transfer-only"];
      return category;
    },
    chooseMoveSet: function(category, entry){
        switch(category.toLowerCase()){
          case "level up":
            if(entry.moves[0] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[0];
            }
            break;
          case "egg":
            if(entry.moves[1] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[1];
            }
            break;
          case "tutor":
            if(entry.moves[2] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[2];
            }
            break;
          case "hm":
            if(entry.moves[3] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[3];
            }
            break;
          case "tm":
            if(entry.moves[4] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[4];
            }
            break;
          case "transfer-only":   
            if(entry.moves[5] == undefined){
              return displayMoves = 'na';
            } else{
              return displayMoves = entry.moves[5];
            }
      };
    },
    findEvolTree: function(member, treeLength, evolData){

     if(member == 'eevee' || member == 'vaporeon' || member == 'jolteon' || member == 'flareon' || member == 'sylveon' || member == 'espeon' || member == 'umbreon' || member == 'leafeon' || member == 'glaceon') {
                
          return evolution = evolData;

        } else if(treeLength == 3){
          
          return evolution = evolData;

        } else if (treeLength == 2){

          return evolution = evolData;
        }

    }, //findEvolTree end
    evolState: function(name, treeLength){
     if(member == 'eevee' || member == 'vaporeon' || member == 'jolteon' || member == 'flareon' || member == 'sylveon' || member == 'espeon' || member == 'umbreon' || member == 'leafeon' || member == 'glaceon') {
                
          return evolState = 'eevee';

        } else if(treeLength == 3){
          
          return evolState = treeLength;

        } else if (treeLength == 2){

          return evolState = treeLength;
        }      
    }
  }
});
pkmApp.factory('compute', function(){
  return {
    objectLength: function(obj){

        var objLength = 0;
        var k;
        for (k in obj) {
          if (obj.hasOwnProperty(k)) {
              objLength++;
          }
        } 
         
        return objLength;   
    }
    
  };
});
pkmApp.factory('menuToggle', function(){
  return {
    state: function(counter){
      if(counter % 2 == 0){
        return true;
      } else {
        return false;
      }
    }
  };
})




