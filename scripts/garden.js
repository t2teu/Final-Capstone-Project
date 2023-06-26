

fetch('https://microbloglite.herokuapp.com/api/posts')
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.getElementById('posts-container');
        const posts = data.posts;

        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');

          const usernameElement = document.createElement('span');
          usernameElement.classList.add('username');
          usernameElement.textContent = post.username;

          const timestampElement = document.createElement('span');
          timestampElement.classList.add('timestamp');
          timestampElement.textContent = new Date(post.createdAt).toLocaleString();

          const likesElement = document.createElement('span');
          likesElement.classList.add('likes');
          likesElement.textContent = `Likes: ${post.likes.length}`;

          const textElement = document.createElement('p');
          textElement.textContent = post.text;

          postElement.appendChild(usernameElement);
          postElement.appendChild(timestampElement);
          postElement.appendChild(likesElement);
          postElement.appendChild(textElement);

          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error(error));