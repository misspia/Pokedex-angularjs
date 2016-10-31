pkmApp.factory('getData', function($http){
  var filepath = '../../../server/json/';
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
pkmApp.factory('choose', function(){
  var displayMoves = {};
  return{
    moveCategory: function(){
      category = ["Level Up", "Egg", "Tutor", "HM", "TM", "Transfer-only"];
      return category;
    },
    chooseMoveSet: function(category, entry){
        switch(category.toLowerCase()){
          case "level up":
            return displayMoves = entry.moves[0];
            break;
          case "egg":
          return displayMoves = entry.moves[1];
            break;
          case "tutor":
            return displayMoves = entry.moves[2];
            break;
          case "hm":
            return displayMoves = entry.moves[3];
            break;
          case "tm":
            return displayMoves = entry.moves[4];
            break;
          case "transfer-only":
            return displayMoves = entry.moves[5];
      };
    }
  }
});
