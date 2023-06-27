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

    // Check if the user is logged in
    if (isLoggedIn()) {
      // User is logged in, fetch and display user profile data
      const profileName = document.getElementById("profile-name");
      const profileLocation = document.getElementById("profile-location");
      const profileAbout = document.getElementById("profile-about");
      const profileBio = document.getElementById("profile-bio");
      const profileBadges = document.getElementById("profile-badges");

      // Fetch user profile data from API or database
      const userProfileData = {
          name: "Ash Ketchup",
          location: "Emerald City",
          about: "Pokémon Trainer",
          bio: "Lives in Emerald City",
          badges: "Earned 15 gym badges"
      };

      // Update the profile information
      profileName.textContent = userProfileData.name;
      profileLocation.textContent = userProfileData.location;
      profileAbout.textContent = userProfileData.about;
      profileBio.textContent = userProfileData.bio;
      profileBadges.textContent = userProfileData.badges;
  } else {
      // User is not logged in, display alert and redirect to login page
      alert("You must be a User");
      window.location.replace("login.html");
  }
