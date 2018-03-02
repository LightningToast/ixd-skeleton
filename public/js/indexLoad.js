'use strict';
var rescheduleVal = "";
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
	//console.log(document.getElementById("startForm").value);
	$(".reschedulePrompt").hide();
	$(".addPrompt").hide();
	$("#rescheduleBeginButton").click(function(e) {
		$(".reschedulePrompt").hide();
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
		$(".reschedulePrompt").show();
		rescheduleVal = e.target.id;
				/*$.post("/", {"modifyTask": true,
					"rescheduleTask": true,
					"taskName":e.target.id}, rescheduleTask);
		*/
	});
	$(".task").click(function(e) {
		console.log("task clicked");
		$(".reschedulePrompt").show();
		rescheduleVal = e.target.id;
		/*
		$.post("/", {"modifyTask": true,
					"rescheduleTask": true,
					"taskName":e.target.id}, rescheduleTask);
		*/
	});

	$(".btn-next").click(function(e){
		console.log("add");
		$(".addPrompt").show();
		//$(".loop").css("opacity", "0.3");
	});

}
function projectClick(e) { 
    // prevent the page from reloading      
    console.log("click");
    e.preventDefault();
    // In an event handler, $(this) refers to      
    // the object that triggered the event      

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
	
}
function modifyTask(result) {
	//console.log(result);
}
function rescheduleTask(result) {
	console.log("reschedule Task Complete");
	console.log(result);
	location.reload();
	
}



