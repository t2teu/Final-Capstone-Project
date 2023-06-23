// fetch api
fetch('https://microbloglite.herokuapp.com/api/posts?limit=100000000000&offset=0', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY4NzU1MzY1NiwiZXhwIjoxNjg3NjQwMDU2fQ.v5_q7pJnJg51f4UnZgo_d3EQpPGPvD2M8iDPkZLwDvo'
    }
  })
    .then(response => response.json())
    .then(data => {
     const postsContainer = document.getElementById('posts');
      const posts = data;

      if (posts) {
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'post';

          const usernameElement = document.createElement('div');
          usernameElement.className = 'username';
          usernameElement.textContent = post.username;

          const textElement = document.createElement('div');
          textElement.textContent = post.text;

          const likesElement = document.createElement('div');
          likesElement.className = 'likes';
          likesElement.textContent = `Likes: ${post.likes.length}`;

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