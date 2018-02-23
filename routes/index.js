
/*
 * GET home page.
 */
var data = require('../data.json');
	console.log('INDEX');
var hourHeight = 60;
var initialHeightBuffer = 80;
exports.view = function(req, res){
	//console.log(res);
  	res.render('index', data);
};
exports.setData = function (req, res) {
	//console.log(req);
	console.log("SET DATA");
	console.log(req.body);
	var height = initialHeightBuffer * parseInt(req.body.duration);
	var rawTop = parseInt(req.body.timeStart);
	if(rawTop == 12) {
		rawTop = 0;
	}
	var top = hourHeight + initialHeightBuffer * rawTop;
	console.log(top);
	data.events.push({
		"title":req.body.title,
		"description":req.body.description,
		"timeStart":req.body.timeStart,
		"timeEnd":req.body.timeEnd,
		"duration":req.body.duration,
		"class":req.body.class,
		"height":height+"px",
		"top":top+"px"
	});
	res.render('index', data);
}