"use strict";

const gradient = document.querySelector( '.gradient' );

function getPos( ev ){
  gradient.style.background = 'radial-gradient( circle at ' 
    + ev.clientX + 'px '
    + ev.clientY + 'px, '
    + 'rgba( 0, 80, 120, 0.7) 0, '
    + 'rgba( 0, 0, 20, 1 ) 80% )';
}
addEventListener( 'mousemove', getPos, false );

