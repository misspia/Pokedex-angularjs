var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

var baseUrl = "http://pokemondb.net",
moves = {},
moveUrls = [];

request(baseUrl + '/move/all', function(error, response, html){
	if(!error && response.statusCode == 200){
		var $ = cheerio.load(html);
		var table = $('#moves').children('tbody').children('tr');
		$(table).each(function(i, element){
			var moveRef = $(this).children('td').eq(0).children('a').attr('href');
			moveUrl = baseUrl + moveRef;
			moveUrls.push(moveUrl);			
		});
		console.log(moveUrls);
		console.log(moveUrls.length);
		console.log('-----------------------------------------------collected all Urls: ' +moveUrls.length);
		for(i = 0; i < 621; i ++){
			sleepFor(1000);
			getMove(moveUrls[i], i);	
			console.log("--------------------------" + i);
			sleepFor(1000);
		};
	};
});
function getMove(moveUrl, index){
	request(moveUrl, function(error, response, html){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(html);
			moveName = $('article').children('h1').eq(0).text().replace(' (move)', '').toLowerCase();
			moveDescr = $('#move-descr').next().find('tr').last().children('td').text();
			moves[moveName] = moveDescr;
			console.log("wrote " + moveName + " from " + moveUrl + " index ------------ " + i);

		fs.writeFile('../../app/json/moves.json', JSON.stringify(moves, null, 4), function(error){
			if (error) return console.log(error);
		 		console.log('writing complete: ' + i);
		});	
		}  else {
			console.log("couldn't download " + moveName);
		    getMove(moveUrl, index);

		    if (attempts > 3) {
		    	console.log("failed more than 3 times, not retrying");
		    }
		}		
		// console.log(moves);	
	
	});
	console.log(" end of function +++++++++++++++++++++++++++++++++++++ " + i);
};
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}







