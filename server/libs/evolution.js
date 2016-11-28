var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
const EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

var url = "http://pokemondb.net/evolution";
evolutionTree();

function evolutionTree(){
	
	request(url, function(error, response, html){
		if(!error && response.statusCode == 200) {
			$ = cheerio.load(html);
			var fam = $('.infocard-evo-list');
			var families = [];

			$(fam).each(function(i, element){			
				// if(i > 60){return false;}
				var group = {},
					famObj = {},
					members = []; 

				$($(this).children('span').not('.small')).each(function(j, element){
					var pokemon = {}, 
						famArr = [];
							
					var name = $(this).find('a.ent-name').text().toLowerCase();
				
					if($(this).attr('class') == 'infocard-group') {
						$($(this).children('span').not('.small')).each(function(i, elemment){
							var name = $(this).find('a.ent-name').text().toLowerCase();

							members.push(name); 

							if(name == 'vaporeon' || name == 'jolteon' || name == 'flareon' || name == 'sylveon' ) {
								
								condition = $(this).next().text();
								var adjStage1 = j + 1; /////////////////
								groupedEvolCondition(condition, pokemon, name, famObj, adjStage1 ); /////////////////

							} else {
								condition = $(this).prev().text();

								groupedEvolCondition(condition, pokemon, name, famObj, j );
							}
						});
					} else {
						members.push(name); 

						if(name == 'eevee'){
							condition = 'base';
							var adjStage0 = j -1; //////////////

							addStage(pokemon, name, condition, famObj, adjStage0); ///////////////////
						} else {
							evolutionCondition($, j, famObj, famArr, $(this), name, pokemon);
						}
						
					}					
							
				});	
				group['members'] = [];
				group['tree'] = {};
				group['members'] = members;
				group['tree'] = famObj;
				// console.log(members);
				// console.log(famObj);
				families.push(group);
			});	
			write(families);			
		}
	});
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
function write(families){
	fs.writeFile('../../app/json/evolution.json', JSON.stringify(families, null, 4), function(error){
	if (error) return console.log(error);
 		console.log('writing complete');
	});
}
function evolutionCondition($, i, famObj, famArr, item, name, pokemon){
	if(i == 0){
		condition = 'base';
		
	} else {
		condition = item.prev().text();
		condition = condition.substring(condition.indexOf("(") + 1);
		condition = condition.substring(0, condition.indexOf(')'));
		condition = condition.replace('holding', 'holding ').replace('learn', ' learn' ).replace(/\\/g, '');
	}	
	addStage(pokemon, name, condition, famObj, i);	
};

function groupedEvolCondition(condition, pokemon, name, famObj, stage ){
	condition = condition.substring(condition.indexOf("(") + 1);
	condition = condition.substring(0, condition.indexOf(')'));
	condition = condition.replace('holding', 'holding ').replace(/\\/g, '');

	addStage(pokemon, name, condition, famObj, stage);
};

function addStage(pokemon, name, condition, famObj, stage){

	pokemon[name] = condition
	famObj["stage" + stage] = pokemon;	
};
function formatCondition(condition){
	condition = condition.substring(condition.indexOf("(") + 1);
	condition = condition.substring(0, condition.indexOf(')'));
	condition = condition.replace('holding', 'holding ').replace(/\\/g, '');
};







