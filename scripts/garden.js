// Array of image URLs for profile pictures
const profilePictures = [
  'https://images.unsplash.com/photo-1560807707-8cc77767d783',
  'https://images.unsplash.com/photo-1534796636915-373b060bfa21',
  'https://images.unsplash.com/photo-1508762883283-4c3272905071',
  // Add more image URLs here
];

// Function to get a random profile picture URL
function getRandomProfilePicture() {
  const randomIndex = Math.floor(Math.random() * profilePictures.length);
  return profilePictures[randomIndex];
}

// Function to get the user token from localStorage
function getUserToken() {
  const loginData = localStorage.getItem('login-data');

  if (loginData) {
    const parsedData = JSON.parse(loginData);
    if (parsedData.token) {
      return parsedData.token;
    }
  }

  console.error('User token not found');
  return 'DEFAULT_TOKEN';
}

// Function to create a new post
function createPost(text) {
  const token = getUserToken();

  // Check if the text exceeds the character limit
  const characterLimit = 500;
  if (text.length > characterLimit) {
    console.error('Post exceeds the character limit');
    return;
  }

  fetch('https://microbloglite.herokuapp.com/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(data => {
      console.log('New post created:', data);
      const textInput = document.getElementById('textInput');
      textInput.value = '';
      fetchPosts();
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

// Function to delete a post
function deletePost(postId) {
  const token = getUserToken();

  fetch(`https://microbloglite.herokuapp.com/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Post deleted:', data);
      fetchPosts();
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
}

// Function to fetch posts from the API
function fetchPosts() {
  const token = getUserToken();

  fetch('https://microbloglite.herokuapp.com/api/posts?limit=100000000000&offset=0', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('posts');
      postsContainer.innerHTML = '';

      // Add post data to HTML
      if (data && data.length > 0) {
        data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'post';

          const profilePictureElement = document.createElement('img');
          profilePictureElement.className = 'profile-picture';
          profilePictureElement.src = getRandomProfilePicture();

          const contentElement = document.createElement('div');
          contentElement.className = 'content';

          const usernameElement = document.createElement('div');
          usernameElement.className = 'username';
          usernameElement.innerHTML = post.username;

          const textElement = document.createElement('div');
          textElement.innerHTML = post.text;

          const likesElement = document.createElement('div');
          likesElement.className = 'likes';
          likesElement.innerHTML = `Likes: ${post.likes.length}`;

          // Display delete button only for posts made from your token
          if (post.userToken === token) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
              deletePost(post.id);
            });
            contentElement.appendChild(deleteButton);
          }

          contentElement.appendChild(usernameElement);
          contentElement.appendChild(textElement);
          contentElement.appendChild(likesElement);

          postElement.appendChild(profilePictureElement);
          postElement.appendChild(contentElement);

          postsContainer.appendChild(postElement);
        });
      } else {
        console.error('No posts found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchPosts();

// Event listener for the post form submission
const form = document.getElementById('postForm');

form.addEventListener('submit', event => {
  event.preventDefault();

  const textInput = document.getElementById('textInput');
  const text = textInput.value.trim();

  if (text !== '') {
    createPost(text);
  }
});
