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
	    for(i = 0; i < obj.length; i++){
	    	download_gif(obj[i], 1);
	    	
	    	if(i % 15 == 0 ){
	    		sleepFor(5000);
	    	} else{
	    		sleepFor(1000);
	    	}
	    };	    	
    });

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
		.pipe(fs.createWriteStream('../img/'+ item.name.toLowerCase() + ".gif"));
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

