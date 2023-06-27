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