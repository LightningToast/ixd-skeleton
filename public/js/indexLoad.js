'use strict';
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
	$("#loginButton").click(function(e) {
		console.log("Log in clicked!");
		sessionStorage.setItem('loggedIn', 'true');
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



