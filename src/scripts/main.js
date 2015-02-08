var mainElement = document.querySelector('main');

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

    image.setAttribute('src', source);
}

if ("ontouchstart" in window) {
    mainElement.addEventListener('touchstart', valse);
    mainElement.addEventListener('touchleave', valse);
    mainElement.addEventListener('touchend', valse);

    mainElement.addEventListener('touchmove', valse);
} else {
    mainElement.addEventListener('mousedown', valse);
    mainElement.addEventListener('mouseleave', valse);
    mainElement.addEventListener('mouseup', valse);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;

checkForUnveil();
