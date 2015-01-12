var main = document.getElementsByTagName('main')[0];
var images = main.getElementsByTagName('img');

function checkForUnveil() {
    var windowTop = window.scrollY;
    var windowBottom = windowTop + window.innerHeight;

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
    var image = event.currentTarget;
    image.onload = function(event) {
        var second = new Image();
        second.src = event.currentTarget.getAttribute('data-src-second');
    };

    image.setAttribute('src', image.getAttribute('data-src'));

    image.removeEventListener('unveil', unveil);
}

function valse(event) {
    var image = event.currentTarget;
    var source = event.type === 'mousedown' ? image.getAttribute('data-src-second') : image.getAttribute('data-src');

    image.setAttribute('src', source);
}

for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('unveil', unveil);
    images[i].addEventListener('mousedown', valse);
    images[i].addEventListener('mouseup', valse);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;

checkForUnveil();
