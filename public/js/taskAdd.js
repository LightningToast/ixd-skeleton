'use strict';

var count = 0;
$(document).ready(function() {
	console.log("BEGIN TASK ADD");
	initializePage();
})
function initializePage() {
	//console.log(document.getElementById("startForm").value);
	console.log(count);
	count ++;
	$("#myelement").click(function(e) {
		console.log("CLICK");
		$.post("/", {"title": document.getElementById("titleForm").value,
				"description": "",
				"timeStart": document.getElementById("startForm").value,
				"timeEnd": "5",
				"duration": document.getElementById("durationForm").value,
				"class": "task",
				"height": "80px",
				"top": "380px"}, addTask);
	});
	$("#sessionClear").click(function(e) {
		sessionStorage.setItem('loggedIn', 'false');
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
	console.log(result);
}



