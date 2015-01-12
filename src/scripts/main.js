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
    var source = image.getAttribute('data-src');
    if (source) { image.setAttribute('src', source); }
    image.removeEventListener('unveil', unveil);
}

for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('unveil', unveil);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;

checkForUnveil();
