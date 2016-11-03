pkmApp.directive('pokemonList',  function(){
	return {
		restrict:'E',
		 template: `<ul id='pokemon-list' >
						<li ng-repeat = "p in masterlist">
							<ul class="row" ng-click = "getPkm(p.id, p.idStr, p.name, p.sprite, p.form)">
								<li class= "diamond"></li>
								<li class="container-sprite row center">
									<span class = "sprite-icon pki n{{p.id}}{{p.icon}} " ng-class="p.spriteClass"></span>
								</li>
								<li>{{p.idStr}}</li>
								<li class = "sprite-name ">{{p.name | uppercase}}
									<span>{{p.form | uppercase}}<span>
								</li>
								<li class="triangle"></li>			
							</ul>
						</li>
					</ul>`
	};
});
pkmApp.directive('mainNav',  function(){
	return {
		restrict:'E',
		 template: `<ul id = "nav" class="card {{typeColor}} row center">
						<li class="col center" ng-click="changeMenuMain(0)" ng-class = "{active: stateMain==0}" >
							BASIC
						</li>
						<li class="col center" ng-click="changeMenuMain(1)" ng-class = "{active: stateMain==1}">
							MOVES
						</li>
						<li class="col center" ng-click="changeMenuMain(2)" ng-class = "{active: stateMain==2}">
							EVOLUTION
						</li>
					</ul>`
	};
});
pkmApp.directive('display',  function(){
	return {
		restrict:'E',
		 templateUrl: '/templates/display.html'
	};
});
pkmApp.directive('background',  function(){
	return {
		restrict:'E',
		 template: '<ul class="index bg {{typeColor}}"></ul>'
	};
});
pkmApp.directive('displayTitle',  function(){
	return {
		restrict:'E',
		 template: `<span class="row center name">{{id}} {{name | uppercase}}</span>
					<span class="row center species">{{entry.Species | uppercase}}  <span ng-if = "form != '' "> | {{form |uppercase}}</span></span>`
	};
});
pkmApp.directive('displayType',  function(){
	return {
		restrict:'E',
		 template: `<ul class="row center" style="padding-bottom: 1em;">
						<li ng-repeat = "t in entry.Type" ><span class="type {{t | lowercase}}">{{t | uppercase}}</span></li>
					</ul>`
	};
});
pkmApp.directive('spriteMain',  function(){
	return {
		restrict:'E',
		 template: `<li class = "row center">
						<ul >
							<li class="item container-main-sprite col center">
								<ul class="row center">
									<img src="server/img/{{sprite}}.gif">
								</ul>	
							</li>
						</ul>
					</li>`
	};
});
pkmApp.directive('tableStats',  function(){
	return {
		restrict:'E',
		 template: `<table class="stats">
						<tr ng-repeat="(key, stat) in stats">
							<th>{{key}}</th>
							<td ng-init = "sumStat(stat.avg)" class = "text">{{stat.avg}} </td>
							<td class="gauge  " ><div class = "{{typeColor}}" style = "width: {{stat.avg/260 *100 }}%;"></div></td>
							<td class = "text">{{stat.min}} </td>
							<td class = "text">{{stat.max}} </td>
						</tr>
						<tr class = "last">
							<th></th>
							<td class = "text"></td>
							<td class= "gauge"></td>
							<td class = "text">MIN</td>
							<td class = "text">MAX</td>
						</tr>
					</table>`
	};
});
pkmApp.directive('tableGeneral',  function(){
	return {
		restrict:'E',
		 template: `<table class="general row center text">
						<tr>
							<td>{{height}}</td>
							<td>{{weight}}</td>
							<td class = "col center"><span ng-repeat = "a in entry.Abilities">{{a}}</span></td>				
						</tr>
						<tr>
							<th>HEIGHT</th>
							<th>WEIGHT</th>
							<th>ABILITIES</th>					
						</tr>
					</table>`
	};
});
pkmApp.directive('moveCatagoryNav',  function(){
	return {
		restrict:'E',
		 template: `<li class = "moves-category-select {{typeColor}} ">
						<ul class = "row center">
							<li class="label {{typeColor}} " ng-repeat ="set in moveCategory" ng-click="choseMoveSet(set)"><span >{{set}}</span></li>
						</ul>
					</li>`
	};
});
pkmApp.directive('movesSelect',  function(){
	return {
		restrict:'E',
		 template: `<li class = "moves-select">
						<ul >
							<li class = "col center" ng-repeat="(key, value) in displayMoves.Move track by $index" ng-click = "getDetail(value, displayMoves.Type[key], key)">
								<span class="move {{displayMoves.Type[key] | lowercase}}"></span>
								<span >{{value}}</span>
							</li>
						</ul>
					</li>`
	};
});
pkmApp.directive('movesDescription',  function(){
	return {
		restrict:'E',
		 template: `<li class="moves-description col center {{moveDetail.type | lowercase}}">
						<ul>
							<li class="row center name">{{moveDetail.move}}</li>
							<li class="row center"><span class = "type {{moveDetail.type | lowercase}} ">{{moveDetail.type | uppercase}}</span></li>
							<li class="row center table">
								<table rules = "cols" class = "{{typeColor}} ">
									<tr ng-repeat="(key, value) in moveDetail.detail">
										<th>{{key}} </th><td>{{value}} </td>
									</tr>
								</table>
							</li>
							<li>{{moveDetail.description}} </li>
						</ul>
					</li>`
	};
});

pkmApp.directive('evolState3',  function(){
	return {
		restrict:'E',
		 template: `<li  ng-repeat = "stage in evolution" class = "col center stage">
						<ul >
							<li ng-repeat="(name, condition) in stage" class="col center stage-item">
								<ul class="row center">
									<li ng-if ="condition != 'base'" class="col center condition">
										<i class = "text">&rarr;</i>
										<span class = "text">{{condition}} </span>
									</li>
									<li class="col evol-item">
										<ul class = "row center">
											<img src="server/img/{{name}}.gif">
										</ul>					
										<span class = "text">{{name | uppercase}} </span>
									</li>
								</ul>	
							</li>
						</ul>	
					</li>`
	};
});
pkmApp.directive('evolState2',  function(){
	return {
		restrict:'E',
		 template: `<li ng-repeat = "stage in evolution" class = "col center stage">
						<ul>
							<li ng-repeat="(name, condition) in stage" class="col center stage-item">
								<ul class="row center">
									<li ng-if ="condition != 'base'" class="col center condition">
										<i class = "text">&rarr;</i>
										<span class = "text">{{condition}} </span>
									</li>
									<li class="col evol-item">
										<ul class = "row center">
											<img src="server/img/{{name}}.gif">
										</ul>					
										<span class = "text">{{name | uppercase}} </span>
									</li>
								</ul>	
							</li>
						</ul>	
					</li>`
	};
});
pkmApp.directive('evolState1',  function(){
	return {
		restrict:'E',
		 template: `<li ng-if = "evolState == '1'" class = "col center evol-item">
						<ul class = "row center evol-state">
							<sprite-main></sprite-main>
						</ul>
						<span class = "text">{{name}} does not evolve</span>		
					</li>`
	};
});








