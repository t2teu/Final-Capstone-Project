document.getElementById("logoutButton").addEventListener("click", function() {
    console.log("Logout button clicked!");
    const loginData = getLoginData();
  
    // GET /auth/logout
    const options = { 
      method: "GET",
      headers: { 
        // Include the bearer token in the Authorization header
        Authorization: `Bearer ${loginData.token}`,
      },
    };
  
    fetch(apiBaseURL + "/auth/logout", options)
      .then(response => response.json())
      .then(data => {
        // Check the response status
        if (data.statusCode === 401) {
          // Unauthorized, logged out successfully
          alert("Logged out successfully!");
          window.location.href = "login.html"; // Redirect to login page
        } else {
          // Handle other response statuses or errors if necessary
          alert("Logout failed!");
        }
      })
      .catch(error => {
        // Handle any network or request errors
        console.error("Error:", error);
        alert("Logout failed!");
      })
      .finally(() => {
        window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
        window.location.assign("/");  // redirect back to landing page
      });
  });
  