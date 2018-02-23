
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
	console.log("setData");
	if(req.body.modifyTask != 'true') {
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
	} else {
		console.log(req.body.taskName);
		for(event in data.events) {
			
			if(data.events[event].title == req.body.taskName) {
				console.log(data.events[event]);
				data.events[event].timeStart = req.body.taskTime;
				data.events[event].top = req.body.taskTop;
				console.log(data.events[event]);
			}
		}
	}
	res.render('index', data);
}


