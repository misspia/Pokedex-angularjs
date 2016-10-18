var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
// var EventEmitter = require('events').EventEmitter;

// const emitter = new EventEmitter();



fs.readFile('../json/list.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    for(i = 0; i < obj.length; i++){
    	var url = "http://www.pokestadium.com/sprites/xy/" + obj[i].sprite + ".gif";
	    var file = fs.createWriteStream("../img/" + obj[i].sprite + ".gif");
	    // console.log(obj[i].sprite + " ---- " + file);
		var request = http.get(url, function(response) {
			request.setMaxListeners(800);
		  response.pipe(file);
		});
    };
});

// fs.readFile('../json/list.json', 'utf8', function (err, data) {
//     if (err) throw err; // we'll not consider error handling for now
//     var obj = JSON.parse(data);
    
//     	var url = "http://www.pokestadium.com/sprites/xy/" + obj[5].sprite + ".gif";
// 	    var file = fs.createWriteStream("../img/" + obj[5].sprite + ".gif");
// 	    // console.log(obj[i].sprite + " ---- " + file);
// 		var request = http.get(url, function(response) {
// 		  response.pipe(file);
// 		});
// });



