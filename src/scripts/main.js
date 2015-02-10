var mainElement = document.querySelector('main');
var loader = document.querySelector('.loader');

for (var i = 0; i < mainElement.children.length; i++) {
    var mask = mainElement.children[i].querySelector('.imageMask');
    var image = mainElement.children[i].querySelector('img');
    mask.appendChild(loader.cloneNode(true));
    image.addEventListener('unveil', unveil);
}

function checkForUnveil() {
    var windowTop = window.scrollY;
    var windowBottom = windowTop + window.innerHeight;
    var images = document.querySelectorAll('main img');

    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        var elementTop = image.getBoundingClientRect().top;
        var elementBottom = elementTop + image.offsetHeight;

        if (elementBottom >= windowTop - 200 && elementTop <= windowBottom + 200) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('unveil', true, false);
            image.dispatchEvent(event);
        }
    }
}

function unveil(event) {
    var image = event.target || event.toElement;

    image.onload = function(event) {
        var second = new Image();
        second.src = event.currentTarget.getAttribute('data-src-second');
        var loader = image.parentNode.querySelector('.loader');
        image.parentNode.querySelector('.imageMask').removeChild(loader);
    };

    image.setAttribute('src', image.getAttribute('data-src'));

    image.removeEventListener('unveil', unveil);
}

mainElement.addEventListener('unveil', unveil);

function valse(event) {
    var mask = event.target || event.toElement;
    var image = mask.parentNode.querySelector('img');
    var showSecond = event.type === 'mousedown' || event.type === 'touchstart';
    var source = showSecond ? image.getAttribute('data-src-second') : image.getAttribute('data-src');

    if ("ontouchstart" in window && event.type === 'touchstart') {
        valseTimer = setTimeout(function() { image.setAttribute('src', source); }, 100);
    } else {
        image.setAttribute('src', source);
    }
}

function cancelValse(event) {
    window.clearTimeout(valseTimer);
}

if ("ontouchstart" in window) {
    mainElement.addEventListener('touchstart', valse);
    mainElement.addEventListener('touchleave', valse);
    mainElement.addEventListener('touchend', valse);

    var valseTimer;
    mainElement.addEventListener('touchmove', cancelValse);
} else {
    mainElement.addEventListener('mousedown', valse);
    mainElement.addEventListener('mouseleave', valse);
    mainElement.addEventListener('mouseup', valse);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;

checkForUnveil();
