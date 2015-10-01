import { hideTutorial } from './tutorial.js';

export function valse(event) {
    var mask = event.target || event.toElement;

    if (mask.className == 'Portrait-mask') {
        var image = mask.parentNode.querySelector('img');
        var showSecond = event.type === 'mousedown' || event.type === 'touchstart';
        var source = showSecond ? image.getAttribute('data-src-second') : image.getAttribute('data-src');

        if ("ontouchstart" in window && event.type === 'touchstart') {
            valseTimer = setTimeout(function() { image.setAttribute('src', source); }, 100);
        } else {
            image.setAttribute('src', source);
        }

        hideTutorial();
    }
}

export function cancelValse(event) {
    window.clearTimeout(valseTimer);
}