window.onload = function() {
	displayUserNameAndProfile();
};

function displayUserNameAndProfile() {
	//Get display div
	let usernameDiv = document.getElementById("userHere");
	//Get user's username
	let loginData = getLoginData();
	let username = loginData.username;
	//Change text content to username
	usernameDiv.textContent = username;
	//Getting Profile Image from Gravatar
}
// function createHash(username){
//     let hash = username.trim().toLowerCase();
// }