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
	console.log(result);
}



