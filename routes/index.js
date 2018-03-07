
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
  	data["indexB"] = false;
};

exports.indexB = function(req, res){
	//console.log(res);
  	res.render('index', data);
  	data["indexB"] = true;
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
			"timeEnd":req.body.timeStart+req.body.duration,
			"duration":req.body.duration,
			"class":req.body.class,
			"height":height+"px",
			"top":top+"px"
		});
	} else {
		if(req.body.rescheduleTask != 'true') {
			console.log(req.body.taskName);
			for(event in data.events) {
				
				if(data.events[event].title == req.body.taskName) {
					console.log(data.events[event]);
					data.events[event].timeStart = req.body.taskTime;
					data.events[event].timeEnd = req.body.taskTime + data.events[event].duration;
					data.events[event].top = req.body.taskTop;
					console.log(data.events[event]);
				}
			}
		} else {
			console.log("rescheduleTask");
			console.log(req.body.taskName);
			var dataPos = -1;
			for(event in data.events) {
				
				if(data.events[event].title == req.body.taskName) {
					dataPos = event;
				}
			}
			if(dataPos != -1) {
				for(var count = parseFloat(data.events[dataPos].timeEnd); count < 12; count += 0.25) {
					var start = count;
					var end = count + parseFloat(data.events[dataPos].duration);
					if(checkTime(dataPos, start,end)) {
						data.events[dataPos].timeStart = start;
						data.events[dataPos].timeEnd = end;
						data.events[dataPos].top = 60 + (start * 80) + "px";

						break;
					}
				}
				console.log(data.events[dataPos]);

			}
			
			
		}	
	}
	res.render('index', data);
}
function checkTime(pos, start, end) {
	var valid = true;
	for(event in data.events) {
				
		if(event != pos) {
			if((end > data.events[event].timeStart)&&(end < data.events[event].timeEnd)) {
				valid = false;
			}else if((start > data.events[event].timeStart)&&(start < data.events[event].timeEnd)) {
				valid = false;
			}else if((start <= data.events[event].timeStart)&&(end >= data.events[event].timeEnd)) {
				valid = false;
			}
		}
	}

	return valid;
}


