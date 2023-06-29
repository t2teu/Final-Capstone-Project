const introDisplay = document.getElementById('introDisplay');

const videoElement = document.createElement('video');
videoElement.src = '/images/anem.mp4';
videoElement.autoplay = true;
videoElement.loop = true;
videoElement.muted = true;
videoElement.playsInline = true;
videoElement.style.objectFit = 'cover';
videoElement.style.width = '100%';
videoElement.style.height = '100%';

introDisplay.appendChild(videoElement);
