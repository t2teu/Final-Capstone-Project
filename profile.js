<!-- Check if user is logged in -->
<script>
    if(!sessionStorage.getItem('user')) {
        // If not logged in, redirect to login page
        window.location.href = "/login.html";
    }
</script> 

<!-- Link to Posts page -->
<a href="/posts.html">Go to Posts</a>

<!-- Logout button -->
<button onclick="logout()">Logout</button>
<script>
    function logout() {
        // Here we're just clearing the session and redirecting to login page.
        sessionStorage.removeItem('user');
        window.location.href = "/login.html";
    }
</script>

<!-- Form for creating a post -->
<form id="postForm">
    <label for="title">Title:</label><br>
    <input type="text" id="title" name="title"><br>
    <label for="content">Content:</label><br>
    <textarea id="content" name="content"></textarea><br>
    <input type="submit" value="Submit">
</form>

<script>
    document.getElementById('postForm').addEventListener('submit', function(e) {
        e.preventDefault();  // prevent form submission
        // make a fetch request to create a post
        fetch('https://microbloglite.herokuapp.com/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: document.getElementById('title').value,
                content: document.getElementById('content').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        });
    });
</script>

<!-- Form for editing user information -->
<form id="editUserForm">
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email"><br>
    <input type="submit" value="Update">
</form>

<script>
    document.getElementById('editUserForm').addEventListener('submit', function(e) {
        e.preventDefault();  // prevent form submission
        // make a fetch request to update user information
        fetch('https://microbloglite.herokuapp.com/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                email: document.getElementById('email').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        });
    });
</script>