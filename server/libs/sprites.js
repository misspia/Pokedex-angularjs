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
	    for(i = 0; i < 1; i++){
	    	download_gif(obj[711], 1);
	    	
	    	if(i % 15 == 0 ){
	    		sleepFor(6000);
	    	} else{
	    		sleepFor(2000);
	    	}
	    };	    	
    });
///////////////////////////////////fan art only for following megas:
////////////////////////////////// swampert, sceptile, sableye, sharpedo, camerupt, altaria, metagross, rayquaza, lopunny, gallade, audino, diancie, slowbro, steelix

function download_gif(item, attempts) {
	console.log("current: " + item.sprite);
	var url = "http://www.pokestadium.com/sprites/xy/" + item.sprite + ".gif";
	console.log(url);
	request(url)
		.on('error', function(err) {
		    console.log("couldn't download " + attempts + " times: " + item.name);
		    download_gif(item, attempts++);

		    if (attempts > 3) {
		    	console.log("failed more than 3 times, not retrying");
		    }
		})
		.pipe(fs.createWriteStream('../img/'+ item.sprite.toLowerCase() + ".gif"));
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

