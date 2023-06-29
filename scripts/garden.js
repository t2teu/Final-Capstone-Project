function getRandomImageLink(width, height) {
  const randomId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/id/${randomId}/${width}/${height}`;
  
  return imageUrl;
}

// Get user token
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

// Create a new post
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

function likePost(postId, likeButton) {
  const token = getUserToken();

  // Check if the post is already liked
  const likedPosts = JSON.parse(localStorage.getItem('liked-posts')) || [];
  if (likedPosts.includes(postId)) {
    // Post already liked, update the heart icon
    likeButton.innerHTML = '<img src="../images/heart-fill.png" alt="Liked" />';
    likeButton.disabled = true;
    return;
  }

  fetch('https://microbloglite.herokuapp.com/api/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ postId })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Post liked:', data);
      fetchPosts();
      likeButton.innerHTML = '<img src="../images/heart-fill.png" alt="Liked" />';
      likeButton.disabled = true;

      // Save the liked post ID in localStorage
      likedPosts.push(postId);
      localStorage.setItem('liked-posts', JSON.stringify(likedPosts));
    })
    .catch(error => {
      console.error('Error liking post:', error);
    });
}

// Function to fetch posts from the API based on the selected filter
function fetchPosts() {
  const token = getUserToken();
  const selectedFilter = getSelectedFilter();

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

      // Sort posts based on the time it was posted or number of likes
      if (selectedFilter === 'likes') {
        data.sort((a, b) => b.likes.length - a.likes.length); // Sort by most likes
      } else if (selectedFilter === 'timestamp') {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recently posted
      }

      // Add post data to HTML
      if (data && data.length > 0) {
        data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'post';

          const usernameElement = document.createElement('div');
          usernameElement.className = 'username';
          usernameElement.innerHTML = post.username;

          // Create and append profile picture element
          const profilePictureElement = document.createElement('img');
            profilePictureElement.className = 'profile-picture';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = 'Delete';
            deleteButton.addEventListener('click', () => {
              deletePost(post._id);
            });

            const width = 200;
            const height = 200;

            // Generate a random image link
            const imageUrl = getRandomImageLink(width, height);

            profilePictureElement.src = imageUrl;
            postElement.appendChild(profilePictureElement);
            

          const textElement = document.createElement('div');
          textElement.innerHTML = post.text;

          const likesElement = document.createElement('div');
          likesElement.className = 'likes';

          const likeButton = document.createElement('button');
          likeButton.className = 'like-button';
          const userLiked = post.likes.includes(token);
          if (userLiked) {
            likeButton.innerHTML = '<img src="../images/heart-fill.png" alt="Liked" />';
            likeButton.disabled = true;
          } else {
            likeButton.innerHTML = '<img src="../images/heart.png" alt="Like" />';
            likeButton.addEventListener('click', () => {
              likePost(post._id, likeButton);
            });
          }

          const likesCountElement = document.createElement('span');
          likesCountElement.className = 'likes-count';
          likesCountElement.innerHTML = post.likes.length;

          likesElement.appendChild(likeButton);
          likesElement.appendChild(likesCountElement);
        
          
          // Calculate time elapsed since the post was created
          const createdAtElement = document.createElement('div');
          createdAtElement.className = 'created-at';
          const createdAt = new Date(post.createdAt);
          const now = new Date();
          const timeDiff = now - createdAt;

          if (timeDiff < 60000) {
            // Less than 1 minute ago
            createdAtElement.innerHTML = 'Just now';
          } else if (timeDiff < 3600000) {
            // Less than 1 hour ago
            const minutes = Math.floor(timeDiff / 60000);
            createdAtElement.innerHTML = `${minutes}m ago`;
          } else if (timeDiff < 86400000) {
            // Less than 1 day ago
            const hours = Math.floor(timeDiff / 3600000);
            createdAtElement.innerHTML = `${hours}h ago`;
          } else if (timeDiff < 172800000) {
            // Less than 2 days ago
            createdAtElement.innerHTML = 'Yesterday';
          } else {
            // More than 2 days ago
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            createdAtElement.innerHTML = createdAt.toLocaleDateString(undefined, options);
          }

          

          // Append the createdAtElement after the usernameElement
          postElement.appendChild(usernameElement);
          postElement.appendChild(createdAtElement);
          postElement.appendChild(textElement);
          postElement.appendChild(likesElement);
          postElement.appendChild(deleteButton);

        
          postsContainer.appendChild(postElement);
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

// Function to handle the filter selection change event
function handleFilterChange() {
  fetchPosts();
}

// Function to get the selected filter option
function getSelectedFilter() {
  const filterSelect = document.getElementById('filter-select');
  return filterSelect.value;
}

// Event listener for filter selection change event
const filterSelect = document.getElementById('filter-select');
filterSelect.addEventListener('change', handleFilterChange);

// Event listener for post form submission
const form = document.getElementById('postForm');
form.addEventListener('submit', event => {
  event.preventDefault();

  const textInput = document.getElementById('textInput');
  const text = textInput.value.trim();

  if (text !== '') {
    createPost(text);
  }
});

// Initial fetch and display of posts
fetchPosts();
