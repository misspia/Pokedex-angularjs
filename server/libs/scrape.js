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
			var form = td.eq(1).find('.aside').text().toLowerCase();
			var imgform = "", iconform = "", nameform = "";

			if(form){
				if(form.includes('mega')){
					if(form.includes(' x')){
						form = "mega x"
						imgform = '-megax';
						iconform = '-mega-x';
					} else if(form.includes(' y')){
						form = 'mega y'
						imgform = '-megay';
						iconform = '-mega-y';
					} else {
						form = 'mega'
						imgform = '-mega';
						iconform = '-mega';
					}

				} else if(form.includes('form')){
					iconform = "-" + form.replace(' forme', '');
					form = form.replace('forme', '');
					if(form.includes('aria') || form.includes('normal') || form.includes('altered') || form.includes('land') || form.includes('incarnate') || form.includes('ordinary') || form.includes('shield')){
						imgform = "";
						
					} else if(form.includes('50%')){
						form = form;
						imgform = "";
						iconform = "-" + form.replace('% forme', '');
					} 
					else{
						imgform = "-" + form.replace(' forme', '').replace(' ', '');
					}					

				} else if(form.includes('mode')){
					form = form.replace('mode', '');
					if(form.includes('standard')){
						imgform = "";
						iconform = "";
					} else {
						imgform = "-" + form.replace(' mode', '');
						iconform = "-" + form.replace(' mode', '');
					}
					
				} else if (form.includes('male') || form.includes('female')){					
					iconform = '-' + form;
					if(form.includes('female')){
						imgform = '-' + form;
					} else{
						imgform = '';
					}

				} else if(form.includes('kyurem')){
					form = form.replace('kyurem', '');
					imgform = "-" + form.replace(' kyurem', '').replace(' ','');
					iconform = "-" + form.replace('kyurem', '');
				} else if (form.includes('rotom')){
					form = form.replace('rotom', '');
					imgform = "-" + form.replace(' rotom', '').replace(' ', '');
					iconform = "-" + form.replace(' rotom', '');
				} else if(form.includes('cloak')){
					if(form.includes('plant')){
						imgform = "";
						iconform = "-" + form.replace('cloak', '');
					} else {
						imgform = "-" + form.replace(' cloak', '');
						iconform = "-" + form.replace('cloak', '');
					}
					
				} else if(form.includes('size') || form.includes('hoopa') || form.includes('primal')){
					form = form.replace('size', '').replace('hoopa', '').replace('groundon', '').replace('kyogre', '');
					imgform = "";
					iconform = "";
				}

			} else {
				nameform = '';
				imgform = '';
				iconform = '';					
			}

			
			pokemon = {
				id: parseInt(td.eq(0).text()),
				idStr: td.eq(0).text().replace(/\s/g, ''),
				name: td.eq(1).children('a').eq(0).text().replace(/\\/g, '') ,
				form: form,
				sprite: td.eq(1).children('a').eq(0).text().replace(/\\/g, '').replace(/'/g, '').replace(/é/g, 'e').replace(/♀/,'f').replace(/♂/,'m').replace('Mr. ', 'mr-').replace(' Jr.', '-jr').toLowerCase() + imgform,
				icon: iconform,
				profileUrl: td.eq(1).children('a').attr('href')

			};
			console.log(pokemon);
			pokedex.push(pokemon);
		});
	};
	// console.log(pokedex);
	fs.writeFile('../../app/json/list.json', JSON.stringify(pokedex, null, 4), function(error){
		if (error) return console.log(error);
	 		console.log('writing complete');
	});
});


