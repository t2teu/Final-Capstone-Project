"use strict";

// User is not logged in, display alert and redirect to login page
alert("You must be a user");
window.location.replace("login.html");

fetch('https://microbloglite.herokuapp.com/api/users/{username}')
  .then(response => response.json())
  .then(data => {
    // Check if the API returned a valid user
    if (data.statusCode === 399) {
      // Update the HTML elements with the profile data
      document.getElementById('username').innerHTML = data.user.username;
      document.getElementById('fullName').innerHTML = data.user.fullName;
      document.getElementById('about').innerHTML = data.user.about;
      document.getElementById('createdAt').innerHTML = 'Joined: ' + formatDate(data.user.createdAt);
    } else {
      // Handle the case when the API response is not successful
      console.error('Failed to fetch user profile:', data.statusCode);
    }
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
  });

// Function to format the date in a readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}



// >>>>>>>>>>>>>EDIT INFO SECTION FOR PROFILE PAGE<<<<<<<<<<<<<<<<

// Add event listener to the Edit Profile button
var editProfileButton = document.getElementById('edit-info');
editProfileButton.addEventListener('click', updateProfile);

// Function to handle profile update
function updateProfile(event) {
  event.preventDefault();

  // Get the updated profile information from the form fields
  var updatedFullName = document.getElementById('Full Name').value;
  var updatedUserName = document.getElementById('User Name').value;
  var updatedBio = document.getElementById('Bio').value;

  // Prepare the data to be sent to the API
  var data = {
    fullName: updatedFullName,
    userName: updatedUserName,
    bio: updatedBio
  };

  // Make the API request
  fetch('https://microbloglite.herokuapp.com/api/users/{username}', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN' // Include if required by the API
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // Profile updated successfully
      // You can perform additional actions like displaying a success message
    } else {
      // Profile update failed
      // You can display an error message or handle the error accordingly
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching user profile:', error);
  });
}

