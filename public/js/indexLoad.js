'use strict';
var rescheduleVal = "";
var modifyTask = "";
var currentData;
$(document).ready(function() {
	console.log("BEGIN Index");
	if(sessionStorage.getItem('loggedIn') == 'true') {
		$(".loginPrompt").hide();
		//sessionStorage.setItem('loggedIn', 'false');
	}
	//sessionStorage.setItem('loggedIn', 'false');
	initializePage();
})
function initializePage() {
	$.get("/getData", function(data){
		currentData = data;
  		console.log("Recieved data json");		
	});
	//document.getElementById("titleForm").value = "TEST";
	//console.log(document.getElementById("startForm").value);
	$(".reschedulePrompt").hide();
	$(".errorPrompt").hide();
	$(".addPrompt").hide();
	$(".modifyPrompt").hide();
	$(".eventMarker").hide();

	$("#rescheduleBeginButton").click(function(e) {
		$(".reschedulePrompt").hide();
	});
	$("#rescheduleManualButton").click(function(e) {
		$(".reschedulePrompt").hide();
	});
	$("#errorCloseButton").click(function(e) {
		$("#errorPopup").hide();
	});
	$("#rescheduleConfirmButton").click(function(e) {
		console.log(rescheduleVal);
		$.post("/", {"modifyTask": true,
					"rescheduleTask": true,
					"taskName":rescheduleVal}, rescheduleTask);
	});

	$("#loginButton").click(function(e) {
		console.log("Log in clicked!");
		sessionStorage.setItem('loggedIn', 'true');
	});
	$(".appointment").click(function(e) {
		console.log("appointment clicked");
		
		var eventPos = findEvent(e.target.id);
		if(eventPos >= 0) {
			$(".modifyPrompt").show();
			console.log("EventPos : " + eventPos);
			document.getElementById("titleModifyForm").value = currentData.events[eventPos].title;
			console.log("Translate time: " + retranslateTime(currentData.events[eventPos].timeStart));
			document.getElementById("startModifyForm").value = retranslateTime(currentData.events[eventPos].timeStart);
			document.getElementById("endModifyForm").value = retranslateTime(currentData.events[eventPos].timeEnd);
			document.getElementById("durationModifyForm").value = currentData.events[eventPos].duration +" hr";
			modifyTask = e.target.id;
		}
		
		//$(".reschedulePrompt").show();
		//rescheduleVal = e.target.id;
				/*$.post("/", {"modifyTask": true,
					"rescheduleTask": true,
					"taskName":e.target.id}, rescheduleTask);
		*/
	});
	$(".task").click(function(e) {
		console.log("task clicked");
		
		
		var eventPos = findEvent(e.target.id);
		if(eventPos >= 0) {
			$(".modifyPrompt").show();
			console.log("EventPos : " + eventPos);
			document.getElementById("titleModifyForm").value = currentData.events[eventPos].title;
			console.log("Translate time: " + retranslateTime(currentData.events[eventPos].timeStart));
			document.getElementById("startModifyForm").value = retranslateTime(currentData.events[eventPos].timeStart);
			document.getElementById("endModifyForm").value = retranslateTime(currentData.events[eventPos].timeEnd);
			document.getElementById("durationModifyForm").value = currentData.events[eventPos].duration +" hr";
			modifyTask = e.target.id;
		}
		//$(".reschedulePrompt").show();
		//rescheduleVal = e.target.id;

		/*
		$.post("/", {"modifyTask": true,
					"rescheduleTask": true,
					"taskName":e.target.id}, rescheduleTask);
		*/
	});
	$(".timeMarker").click(function(e) {
		
		$.get("/getData", function(data){
			currentData = data;
  			//console.log("Get Data: " + currentData.events[0].title);
  			console.log("time marker clicked " + e.target.id);
  			console.log("Check time: " + checkTime(e.target.id));
  			var eventName = checkTime(e.target.id);
  			if(eventName != null) {
  				rescheduleVal = eventName;
  				$(".reschedulePrompt").show();
  				console.log(rescheduleVal);
  				document.getElementById("rescheduleTitle").innerHTML = rescheduleVal;
			}
		});
		
	});
	$(".subTimeMarker").click(function(e) {
		
		$.get("/getData", function(data){
			currentData = data;
  			//console.log("Get Data: " + currentData.events[0].title);
  			console.log("time marker clicked " + e.target.id);
  			console.log("Check time: " + checkTime(e.target.id));
  			var eventName = checkTime(e.target.id);
  			if(eventName != null) {
  				rescheduleVal = eventName;
  				$(".reschedulePrompt").show();
  				console.log(rescheduleVal);
  				document.getElementById("rescheduleTitle").innerHTML = rescheduleVal;
			}
		});
		
	});
	$(".btn-next").click(function(e){
		console.log("add");
		$(".addPrompt").show();
		//$(".loop").css("opacity", "0.3");
	});
	$("#ModifySubmit").click(function(e){
		console.log("modifying task");
		$.post("modify", {"modifyTask": true,
				"oldTitle": modifyTask,
				"title": document.getElementById("titleModifyForm").value,
				"description": "",
				"timeStart": document.getElementById("startModifyForm").value,
				"timeEnd": document.getElementById("endModifyForm").value,
				"duration": document.getElementById("durationModifyForm").value,
				}, addTask);
		$.get("/getData", function(data){
		currentData = data;
  		console.log("Recieved data json");	
  		modifyTask = "";	
	});
		//$(".addPrompt").show();
		//$(".loop").css("opacity", "0.3");
	});
$("#AddSubmit").click(function(e){
		console.log("adding task");
		$.post("/", {"title": document.getElementById("titleForm").value,
				"description": "",
				"timeStart": document.getElementById("startForm").value,
				"timeEnd": document.getElementById("endAt").value,
				"duration": document.getElementById("durationForm").value,
				"class": "task",
				"height": "80px",
				"top": "380px"}, addTask);
		//$(".addPrompt").show();
		//$(".loop").css("opacity", "0.3");
	});

$('.gaClick').click(sendBtnClick);
console.log("clicked");

	function sendBtnClick(event){
ga("send","event", 'submitClicked', 'click');
}

	

}
function projectClick(e) { 
    // prevent the page from reloading      
    console.log("click");
    e.preventDefault();
    // In an event handler, $(this) refers to      
    // the object that triggered the event      

}
function retranslateTime(curTime) {
	var time;
	var timeFloat = parseFloat(curTime);
	var hour = parseInt(curTime);
	var minute = timeFloat % 1;
	var minStr;
	if(hour == 0) {
		hour = 12;
	}
	if(minute == 0) {
		minStr = ":00 PM";
	} else if(minute == .25) {
		minStr = ":15 PM";
	} else if(minute == 0.5) {
		minStr = ":30 PM";
	} else if(minute == 0.75) {
		minStr = ":45 PM";
	}
	return hour + minStr;
}
function addTask(result) {
	//console.log(result);
	
}
function changeTime(ev) {
	console.log(ev.target);
	$.post("/", {"modifyTask": true,
					"taskName":ev.dataTransfer.getData("text"),
					"taskTime":ev.target.id,
					"taskTop":ev.target.style.top}, modifyTask);
	$.get("/getData", function(data){
		currentData = data;
  		console.log("Recieved data json");		
	});
	
}

function checkTime(time) {
	console.log("Check time");
	console.log(time);
	var pos;
	for(event in currentData.events) {
		console.log(event);		
		if((time >= currentData.events[event].start)&&(time <= currentData.events[event].end)) {
			pos = currentData.events[event].title;
			console.log(currentData.events[event]);
		}
	}

	return pos;
}
function findEvent(title) {
	var dataPos = -1;
	for(event in currentData.events) {
			
		if(currentData.events[event].title == title) {
			dataPos = event;
		}	
	}
	return dataPos;
}
function modifyTask(result) {
	//console.log("Callback");
	//console.log(result);
}
function rescheduleTask(result) {
	console.log("reschedule Task Complete");
	console.log(result);
	$.get("/getData", function(data){
		currentData = data;
  		console.log("Recieved data json");		
	});
	location.reload();
	
}
function checkValidMoveSpot(time, event) {
	$.get("/getData", function(data){
		currentData = data;
  		console.log("Recieved data json");		
	});
		
  		if( !checkInTimeRange(time, event) ) {
  			console.log("break time invalid");
  			return false;
  		} else if( !checkTimeOverlap(time, event) ) {
  			console.log("break time occupied");
  			return false;
  		} else {
  			console.log("return true");
  			return true;
  		}
	
}
function checkInTimeRange(timeInit, eventTitle) {
	var dataPos = -1;
	var time = parseFloat(timeInit);
	for(event in currentData.events) {
			
		if(currentData.events[event].title == eventTitle) {
			dataPos = event;
		}	
	}
	if(dataPos >= 0) {
		if((parseFloat(currentData.events[dataPos].timeStart) <= time) && (parseFloat(currentData.events[dataPos].timeEnd) >= parseFloat(time + parseFloat(currentData.events[dataPos].duration)))) {
			console.log("Time is valid!");
			return true;
		} else {
			console.log(time);
			console.log(parseFloat(time + parseFloat(currentData.events[dataPos].duration)));
			console.log(currentData.events[dataPos].timeStart);
			console.log(currentData.events[dataPos].timeEnd);
		}
	} else {
		console.log("Time is valid!");

		return false;
	}
}
function checkTimeOverlap(timeInit, eventTitle) {
	var valid = true;
	var dataPos = -1;
	var start = parseFloat(timeInit);
	
	for(event in currentData.events) {
			
		if(currentData.events[event].title == eventTitle) {
			dataPos = event;
		}	
	}
	//console.log("Checking time " + start + " - " + end);
	var end = parseFloat(start + parseFloat(currentData.events[dataPos].duration));
	console.log("Checking for " + start + " to " + end);
	for(event in currentData.events) {
				
		if(event != dataPos) {
			if((end > currentData.events[event].start)&&(end < currentData.events[event].end)) {
				console.log(currentData.events[event].title);
				console.log("End is between start and end " + currentData.events[event].start + " - " + currentData.events[event].end);
				valid = false;
			} else if((start > currentData.events[event].start)&&(start < currentData.events[event].end)) {
				console.log(currentData.events[event].title);
				console.log("Start is between start and end " + currentData.events[event].start + " - " + currentData.events[event].end);
				valid = false;
			} else if((start <= currentData.events[event].start)&&(end >= currentData.events[event].end)) {
				console.log(currentData.events[event].title);
				console.log("Time block encompasses data " + currentData.events[event].start + " - " + currentData.events[event].end);
				valid = false;
			} else if((start < currentData.events[event].start)&&(end > currentData.events[event].start)) {
				console.log(currentData.events[event].title);
				console.log("End overlaps " + currentData.events[event].start + " - " + currentData.events[event].end);
				valid = false;
			} else if((start < currentData.events[event].end)&&(end > currentData.events[event].end)) {
				console.log(currentData.events[event].title);
				console.log("Start overlaps " + currentData.events[event].start + " - " + currentData.events[event].end);
				valid = false;
			}
		}
	}

	return valid;
}



