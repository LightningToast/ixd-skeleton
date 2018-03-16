
/*
 * GET home page.
 */
var data = require('../data.json');
	console.log('INDEX');
var hourHeight = 60;
var initialHeightBuffer = 80;
exports.view = function(req, res){
	//console.log(res);
  	data["indexB"] = false;
  	res.render('index', data);
  	
};
exports.getData = function(req, res) {
	console.log("getData");
	res.send(data);
}

exports.indexB = function(req, res){
	//console.log(res);
  	data["indexB"] = true;
  	res.render('index', data);
  	
};
exports.delete = function(req, res){
	//console.log(res);
  	var dataPos = -1;
	for(event in data.events) {
			
		if(data.events[event].title == req.body.deleteTask) {
			dataPos = event;
		}	
	}
	//delete data[dataPos];
	console.log("Deleting task: " + data.events[dataPos].title);
  	//delete data.events[dataPos];\
  	data.events[dataPos].start = -1;
  	data.events[dataPos].end = -1;
  	data.events[dataPos].title = "";
  	data.events[dataPos].top = 0;
  	data.events[dataPos].height = 0;
  	res.render('index', data);
  	
};
exports.setData = function (req, res) {
	console.log("setData");
	if(req.body.modifyTask != 'true') {
		addTask(req);
	} else {
		if(req.body.rescheduleTask != 'true') {
			console.log(req.body.taskName);
			for(event in data.events) {
				
				if(data.events[event].title == req.body.taskName) {
					console.log(data.events[event]);
					data.events[event].start = req.body.taskTime;
					var timeEnd = parseFloat(req.body.taskTime) + parseFloat(data.events[event].duration);
					data.events[event].end = timeEnd;
					data.events[event].top = req.body.taskTop;
					console.log(data.events[event]);
				}
			}
		} else {
			rescheduleTask(req);
		}	
	}
	res.render('index', data);
}
exports.modifyData = function (req, res) {
	console.log("modifyData");
	console.log(req.body);
	var dataPos = -1;
	for(event in data.events) {
			
		if(data.events[event].title == req.body.oldTitle) {
			dataPos = event;
		}	
	}
	console.log("DataPos " + dataPos);
	var timeStartConv = parseTime(req.body.timeStart);
	var timeEndConv = parseTime(req.body.timeEnd);

	var height = initialHeightBuffer * parseInt(req.body.duration);
	
	var end = timeEndConv;
	var start = timeStartConv;
	var dur = parseFloat(req.body.duration);
	var classType = "task";
	console.log("end-start=duration " + end + "-" + start + "=" + dur);
	if(dur == (end - start)) {
		classType = "appointment";
		console.log("This is an appointment");
	} else {
		console.log("Not an appointment");
	}

	var timeToStart = findTime(req, timeStartConv, timeEndConv);
	var timeToEnd = timeToStart + parseFloat(req.body.duration);

	var top = hourHeight + initialHeightBuffer * timeToStart;

	var timeTop = hourHeight + initialHeightBuffer * timeStartConv;
	var timeDuration = initialHeightBuffer * (timeEndConv - timeStartConv);

	console.log(top);

	

		data.events[dataPos].title = req.body.title,
		data.events[dataPos].timeTitle = req.body.title+"Marker",
		data.events[dataPos].timeStart = timeStartConv,
		data.events[dataPos].timeEnd = timeEndConv,
		data.events[dataPos].timeTop =  timeTop+"px",
		data.events[dataPos].timeDuration =  timeDuration+"px",
		data.events[dataPos].duration = req.body.duration,
		data.events[dataPos].classType = classType,
		data.events[dataPos].height = height+"px",
		data.events[dataPos].top = top+"px", 
		data.events[dataPos].start = timeToStart,
		data.events[dataPos].end = timeToEnd

		console.log("Return: "+ data.events[dataPos].duration);
	res.render('index', data);
}
function addTask(req) {
	console.log("SET DATA");
	console.log(req.body);

	console.log("Parsing time " + parseTime(req.body.timeStart));

	var timeStartConv = parseTime(req.body.timeStart);
	var timeEndConv = parseTime(req.body.timeEnd);

	var height = initialHeightBuffer * parseInt(req.body.duration);
	
	var end = timeEndConv;
	var start = timeStartConv;
	var dur = parseFloat(req.body.duration);
	var classType = "task";
	console.log("end-start=duration " + end + "-" + start + "=" + dur);
	if(dur == (end - start)) {
		classType = "appointment";
		console.log("This is an appointment");
	} else {
		console.log("Not an appointment");
	}

	var timeToStart = findTime(req, timeStartConv, timeEndConv);
	var timeToEnd = timeToStart + parseFloat(req.body.duration);

	var top = hourHeight + initialHeightBuffer * timeToStart;

	var timeTop = hourHeight + initialHeightBuffer * timeStartConv;
	var timeDuration = initialHeightBuffer * (timeEndConv - timeStartConv);

	console.log(top);
	data.events.push({
		"title":req.body.title,
		"timeTitle":req.body.title+"Marker",
		"description":req.body.description,
		"timeStart":timeStartConv,
		"timeEnd":timeEndConv,
		"timeTop": timeTop+"px",
		"timeDuration": timeDuration+"px",
		"duration":req.body.duration,
		"class":classType,
		"height":height+"px",
		"top":top+"px", 
		"start":timeToStart,
		"end":timeToEnd
	});

	console.log("Time to start " + timeToStart);
	console.log("Time to end " + timeToEnd);

}
function parseTime(time) {
	var timeVal = parseFloat(time);
	if(timeVal == 12) {
		timeVal = 0;
	}
	var timePos = time.indexOf(":");
	var timeDec = parseInt(time.substring(timePos + 1));
	console.log("parseTime " + timeVal + " " + timePos + " " + timeDec);
	switch(timeDec) {
		case 15:
			timeVal += 0.25;
			break;
		case 30:
			timeVal += 0.50;
			break;
		case 45:
			timeVal += 0.75;
			break;

	}
	return timeVal;
}
function findTime(req, timeStart, timeEnd) {
	console.log("rescheduleTask");
	console.log(req.body.taskName);
	
	console.log("Time to check " + timeStart + " - " + timeEnd);
	var startTime = timeStart;
	for(var count = timeStart; count < timeEnd; count += 0.25) {
		var start = count;
		var end = count + parseFloat(req.body.duration);
		console.log();
		console.log();
		console.log("Time to check " + start + " - " + end);
		if(checkTime(-1, start, end)) {
			
			console.log("Found time: " + start + " - " + end);
			break;
		} else {
			console.log("Time not valid " + start + " - " + end);
		}
	}
	
	console.log("End of loop");
	return start;
}



function rescheduleTask(req) {
	console.log("rescheduleTask");
	console.log(req.body.taskName);
	var dataPos = -1;
	for(event in data.events) {
			
		if(data.events[event].title == req.body.taskName) {
			dataPos = event;
		}	
	}
	console.log("Data pos is " + dataPos);
	if(dataPos != -1) {
		console.log("Time to check " + parseFloat(data.events[dataPos].start) + " - " + data.events[dataPos].timeEnd);
		for(var count = parseFloat(data.events[dataPos].start) + 0.25; count < parseFloat(data.events[dataPos].timeEnd); count += 0.25) {
			var start = count;
			var end = count + parseFloat(data.events[dataPos].duration);
			console.log("Time to check " + start + " - " + end);
			if(checkTime(dataPos, start, end)) {
				data.events[dataPos].start = start;
				data.events[dataPos].end = end;
				data.events[dataPos].top = 60 + (start * 80) + "px";
				console.log("Found time: " + start + " - " + end);
				break;
			} else {
				console.log("Time not valid " + start + " - " + end);
			}
		}
		console.log(data.events[dataPos]);
		console.log("End of loop");

	} else {
		console.log("Could not find task name" + req.body.taskName);
	}
			
}
function checkTime(pos, start, end) {
	var valid = true;
	console.log("Checking time " + start + " - " + end);
	for(event in data.events) {
				
		if(event != pos) {
			if((end > data.events[event].start)&&(end < data.events[event].end)) {
				console.log(data.events[event].title + " End is between start and end " + data.events[event].start + " - " + data.events[event].end);
				valid = false;
			} else if((start > data.events[event].start)&&(start < data.events[event].end)) {
				console.log(data.events[event].title + " Start is between start and end " + data.events[event].start + " - " + data.events[event].end);
				valid = false;
			} else if((start <= data.events[event].start)&&(end >= data.events[event].end)) {
				console.log(data.events[event].title + " Time block encompasses data " + data.events[event].start + " - " + data.events[event].end);
				valid = false;
			} else if((start < data.events[event].start)&&(end > data.events[event].start)) {
				console.log(data.events[event].title + " End overlaps " + data.events[event].start + " - " + data.events[event].end);
				valid = false;
			} else if((start < data.events[event].end)&&(end > data.events[event].end)) {
				console.log(data.events[event].title + " Start overlaps " + data.events[event].start + " - " + data.events[event].end);
				valid = false;
			}
		}
	}

	return valid;
}


