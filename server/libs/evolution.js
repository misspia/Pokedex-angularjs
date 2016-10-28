var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
const EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

fs.readFile('../json/list.json', 'utf8', function (err, data) {
    if (err) throw err; 
    var obj = JSON.parse(data);
    // download_json(obj[2], 1);
	    for(i = 0; i < obj.length; i++){
	    	download_json(obj[i], 1);
	    };	    	
    });

function download_json(item, attempts) {
	// console.log(item);
	// console.log("downloading: " + item.name);
	var url = "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_evolution_family";
	console.log(url);
	request(url, function(error, response, html){
		if(!error && response.statusCode == 200){
			// var raw = JSON.stringify(JSON.parse(body), null, 2);
			// console.log(raw);
			$ = cheerio.load(html);
			console.log(url);
		




			// fs.writeFile('../json/evolution-chains/evolution-'+ item.id + '.json', raw, function(error){
			// 	if (error) return console.log(error);
			// 	console.log('download complete');
			// });
		} else {
			console.log("couldn't download " + attempts + " times: " + item.name);
		    download_json(item, attempts++);
		    // attempts ++;

		    if (attempts > 3) {
		    	console.log("failed more than 3 times, not retrying");
		    }
		}
	})
};








