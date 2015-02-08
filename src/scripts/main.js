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
    var image = event.currentTarget;
    var source = event.type === 'mousedown' || event.type === 'touchstart' ? image.getAttribute('data-src-second') : image.getAttribute('data-src');

    image.setAttribute('src', source);
}

for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('unveil', unveil);
    images[i].addEventListener('mousedown', valse);
    images[i].addEventListener('mouseleave', valse);
    images[i].addEventListener('mouseup', valse);
    images[i].addEventListener('touchstart', valse);
    images[i].addEventListener('touchleave', valse);
    images[i].addEventListener('touchend', valse);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;

checkForUnveil();
