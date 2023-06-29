"use strict";


function toggleDropUpContent(event) {
    event.preventDefault();
    const dropUpContent = event.target.nextElementSibling;
    dropUpContent.style.display = (dropUpContent.style.display === 'block') ? 'none' : 'block';
  }
  