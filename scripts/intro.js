const gradient = document.querySelector( '.gradient' );

function getPos( ev ){
  gradient.style.background = 'radial-gradient( circle at ' 
    + ev.clientX + 'px '
    + ev.clientY + 'px, '
    + 'rgba( 0, 80, 120, 0.7) 0, '
    + 'rgba( 0, 0, 20, 1 ) 80% )';
}
addEventListener( 'mousemove', getPos, false );

setTimeout(function() {
  const clownfish = document.getElementById('clownfish');
  clownfish.style.animation = 'slide-in 1s forwards';
  clownfish.style.opacity = 1;

  setTimeout(function() {
    clownfish.style.animation = 'slide-out 1s forwards';
    clownfish.style.opacity = 0;
    clownfish.style.display = 'none';
  }, 10000);
}, 20000);