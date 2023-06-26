"use strict";

function registerUser(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const fullnameInput = document.getElementById('fullname').value;
  const passwordInput = document.getElementById('password').value; 
  const confirmPasswordInput = document.getElementById('cpassword').value; 

  // Add validation for password length
  if (passwordInput.length < 8) {
    return alert("Password must be at least 8 characters");
  }

  // Add validation for password match
  if (passwordInput !== confirmPasswordInput) {
    return alert("Passwords do not match");
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "username": usernameInput,
    "fullName": fullnameInput,
    "password": passwordInput,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://microbloglite.herokuapp.com/api/users", requestOptions)
    .then(response => {
      if (response.ok) {
        console.log("User registered successfully!");
        alert("User registration created successfully!");
        window.location.href = '/html/login.html';
      } else {
        if (response.status === 400) {
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
    .catch(error => console.log(error)); 
}