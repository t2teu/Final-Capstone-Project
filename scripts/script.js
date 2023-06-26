document.addEventListener('DOMContentLoaded', (event) => {
    const posts = [
      { content: 'This is a post', timestamp: '2023-06-26T12:00:00Z' },
      { content: 'This is another post', timestamp: '2023-06-25T12:00:00Z' },
      // ...
    ];
  
    const postsContainer = document.getElementById('posts');
  
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  });
  
  function createPostElement(postData) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post', 'card', 'my-3');
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    const content = document.createElement('p');
    content.textContent = postData.content;
    content.classList.add('card-text');
  
    const timestamp = document.createElement('p');
    timestamp.textContent = new Date(postData.timestamp).toLocaleString();
    timestamp.classList.add('card-subtitle', 'mb-2', 'text-muted');
  
    cardBody.appendChild(content);
    cardBody.appendChild(timestamp);
  
    postDiv.appendChild(cardBody);
  
    return postDiv;
  }
  