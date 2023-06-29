"use strict";


function toggleDropUpContent(event) {
    event.preventDefault();
    var dropUpContent = event.target.nextElementSibling;
    dropUpContent.style.display = (dropUpContent.style.display === 'block') ? 'none' : 'block';
  }
  