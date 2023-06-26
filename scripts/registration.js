"use strict";

function signUpUser(event) {
  event.preventDefault(); // prevents the default form behavior on the submission

  // Get user input values from the form
  const username = document.getElementById('username').value;
  const fullname = document.getElementById('fullname').value;
  const password = document.getElementById('password').value; 
  const confirmPassword = document.getElementById('cpassword').value; 

  // validates the length of the password
  if (password.length < 8) {
    return alert("Password must be at least 8 characters");
  }

  // makes sure that passwords match
  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  const headers = new Headers(); // new headers
  headers.append("Content-Type", "application/json"); // sets the "Content-Type" header

  // changing user info to JSON
  const reqBody = JSON.stringify({
    "username": username,
    "fullName": fullname,
    "password": password,
  });

  const reqOpt = {
    method: 'POST', // makes the HTTP method as POST
    headers: headers, // headers for the request
    body: reqBody, // setting request body
    redirect: 'follow' // redirecting option
  };

  // sending out a POST request to API endpoint
  fetch("https://microbloglite.herokuapp.com/api/users", reqOpt)
    .then(response => {
      if (response.ok) { // HTTP status code 200-299 for a successful response
        console.log("User registered successfully!");
        alert("User registration created successfully!");
        window.location.href = '/html/login.html'; // this redirects the user to the login
      } else {
        if (response.status === 400) { // 400 if response is not successful
          return response.json().then(data => {
            if (data.message === "Username already taken") {
              alert("Username is already taken!");
            } else {
              throw new Error("Registration failed!");
            }
          });
        } else {
          throw new Error("Registration failed!");
        }
      }
    })
    .catch(error => console.log(error)); // handle errors occurring during the request
}