// create new post
function createPost(text) {
  fetch('https://microbloglite.herokuapp.com/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY4Nzc5OTA2MSwiZXhwIjoxNjg3ODg1NDYxfQ.lhb3bxUJRHCedwARv_q8ZF62ZGvPoOwKSVzSlUt_k_s'
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

// get posts from API
function fetchPosts() {
  fetch('https://microbloglite.herokuapp.com/api/posts?limit=100000000000&offset=0', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY4Nzc5OTA2MSwiZXhwIjoxNjg3ODg1NDYxfQ.lhb3bxUJRHCedwARv_q8ZF62ZGvPoOwKSVzSlUt_k_s'
    }
  })
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

// add post data to HTML
    if (data && data.length > 0) {
      data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const usernameElement = document.createElement('div');
        usernameElement.className = 'username';
        usernameElement.innerHTML = post.username;

        const textElement = document.createElement('div');
        textElement.innerHTML = post.text;

        const likesElement = document.createElement('div');
        likesElement.className = 'likes';
        likesElement.innerHTML = `Likes: ${post.likes.length}`;

        postElement.appendChild(usernameElement);
        postElement.appendChild(textElement);
        postElement.appendChild(likesElement);

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

// the post button
const form = document.getElementById('postForm');

form.addEventListener('submit', event => {
  event.preventDefault();

  const textInput = document.getElementById('textInput');
  const text = textInput.value.trim();

  if (text !== '') {
    createPost(text);
  }
});