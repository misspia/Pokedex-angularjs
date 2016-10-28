var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "http://pokemondb.net/pokedex/all",
// total = 721,
pokedex = [],
pokemon = {};

request(url, function(error, response, html){
	if(!error && response.statusCode == 200){
		var $ = cheerio.load(html);
		var table = $('#pokedex').children('tbody').children('tr');
		$(table).each(function(i, element){
			var td = $(this).children('td');
			pokemon = {
				id: parseInt(td.eq(0).text()),
				idStr: td.eq(0).text().replace(/\s/g, ''),
				name: td.eq(1).children('a').eq(0).text().replace(/\\/g, ''),
				sprite: td.eq(1).children('a').eq(0).text().replace(/\\/g, '').replace(/'/g, '').replace(/é/g, 'e').replace(/♀/,'f').replace(/♂/,'m').toLowerCase(),
				profileUrl: td.eq(1).children('a').attr('href'),
				imgUrl: td.eq(1).children('a').attr('href').replace(/-/g, '_').replace('/pokedex/', ''),
				spriteClass: "n" + parseInt(td.eq(0).text()) 
			};
			pokedex.push(pokemon);
		});
	};
	// console.log(pokedex);
	fs.writeFile('../json/list.json', JSON.stringify(pokedex, null, 4), function(error){
		if (error) return console.log(error);
	 		console.log('writing complete');
	});
});


