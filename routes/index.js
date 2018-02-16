
/*
 * GET home page.
 */
var data = require('../data.json');
	console.log('INDEX');
exports.view = function(req, res){
	//console.log(data);
  	res.render('index', data);
};