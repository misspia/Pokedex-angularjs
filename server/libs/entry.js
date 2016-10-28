var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var baseUrl = "http://pokemondb.net"
var entry = [];


fs.readFile('../json/list.json', 'utf8', function (err, data) {
    if (err) throw err; 
    var obj = JSON.parse(data);
	    for(i = 0; i < 1; i++){
	    	requestPkm(obj[13], 1);
	    	sleepFor(500);
	    };	    	
   });
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function writeEntry(object){

}
function requestPkm(item, attempts){
	var url = baseUrl + item.profileUrl;
	console.log(url);
	request(url, function(error, response, html){	
		var entryObj = {};

		if(!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			entryObj['id'] = item.idStr;
			var main = $('article'),
				basics = main.find('#dex-basics').next(),
				entries = main.find('#dex-flavor').next().next(),
				evol = main.find('#dex-evolution').next().children().eq(1),
				moves = main.find('#dex-moves').next().next(),
				locations = main.find('#dex-locations').next().next();

				//////////////////////////////BASICS////////////////////////////

				$(basics.children('.svtabs-tab-list').children('li').eq(0)).each(function(i, element){
					var a = $(this).children('a').attr('href'),
						tab = basics.find(a),
						general = tab.children('.colset').eq(0),
						battle = tab.children('.colset').eq(1);
					$(general.children('.col').children('table').find('tr')).each(function(i, element){
						var th = $(this).children('th').text(),
							td = $(this).children('td');
						if(th == "Type"|| th == "Abilities" || th == "Local №"){
							entryObj[th] = [];
							if(th == "Local №"){
								// do nothing
							} else {
								$(td.children('a')).each(function(i, element){
									value = $(this).text();
									entryObj[th].push(value);
								})	
							}													
						} else {
							entryObj[th] = td.text();
						};
					});	//GENERAL END

					/////////////STATS///////////
					entryObj['stats'] = {};
					statObj = {};
					$(battle.children('.col').eq(0).children('table').children('tbody').find('th')).each(function(i, element){
						var th = $(this).text(),
							td = $(this).parent().children('.num');							
						statObj[th] = {
							avg: td.eq(0).text(),
							min: td.eq(1).text(),
							max: td.eq(2).text()
						};	
						entryObj['stats'] = statObj;							
					});	//STATS END
					
					//TYPE DEFENSES
					entryObj['typeDef'] = {};
					typeDefObj = {};
					$(battle.children('.col').eq(1).children('table')).each(function(i, element){
						var type = $(this).find('tr').eq(0),
							effect = $(this).find('tr').eq(1);
							$(type.children('th')).each(function(i, element){
								var typeFull = $(this).children('a').attr('title'),
									typeShort = $(this).children('a').text();
									effectValue = effect.children('td').eq(i).attr('class');
									typeDefObj[typeFull] = effectValue;
							});
							entryObj['typeDef'] = typeDefObj;
					}); //TYPE DEFENSES END
				}); //BASIC END
				
				//////////////////////////////ENTRIES////////////////////////////
				if(entries.is('ul')){
					entryObj['description'] = entries.children('li').eq(0).text();
				} else if(entries.is('table')) {
					entryObj['description'] =entries.children('tbody').children('tr').last().children('td').text();
				}; //ENTRIES END
					
				////////////////////////////MOVES////////////////////////////
				entryObj['moves'] = {};
				movesObj = {};
				movesArr = [];
				$(main.find('.tabset-moves-game').children('.svtabs-panel-list').children('.svtabs-panel').last().find('h3')).each(function(i, element){
					var thead = $(this).next().next().children('thead'),
						tbody = $(this).next().next().children('tbody');
					movesObj[i] = {title: $(this).text()};
					moveSet = [];
					$(thead.find('th')).each(function(j, element){
						var th = $(this).children('div').text();
						var tr = tbody.children('tr');
						moveSet.push(th);

						setObj = {};
						setObj[th] = [];
						$(tr).each(function(k, element){
							var td = $(this).children('td').eq(j).text();
							setObj[th].push(td);
						});
						movesObj[i][th] =setObj[th];
					});		//end th
					movesObj[i]['set'] =  [];
					movesObj[i]['set'] = moveSet;
				});
				entryObj['moves'] = movesObj;	//MOVES END		

				////////////////////////////LOCATIONS////////////////////////////
				entryObj['locations'] = [];
				locObj = {};
				if(locations.is('ul')){
					entryObj['locations'].push(locations.children().eq(0).text());

				} else if(locations.is('table')){
					$(locations.find('tr')).each(function(i, element){
						var th = $(this).children('th').text(),
							tda = $(this).children('td').children('a');
						locObj[th] = [];
						$(tda).each(function(i, element){
							locObj[th].push($(this).text()); 
						});								
					});
					entryObj['locations'].push(locObj);
				};	//LOCATIONS END	
				
			// entry.push(entryObj);
			// console.log(entry);			
		} 

		else {
			console.log("couldn't download " + attempts + " times: " + item.name);
		    requestPkm(item, attempts++);
		    if (attempts > 3) {
		    	console.log("failed more than 3 times, not retrying");
		    }
		}

		console.log(item.idStr)
		// console.log(entry)
		fs.writeFile('../json/entry/entry' + "-" + item.idStr + '.json', 
					 JSON.stringify(entryObj, null, 4),
					 function(error){
				
			if (error) return console.log(error);
			
			console.log('save complete');
		});

		sleepFor(500);
	}); //request end

}; //requestPkm end

