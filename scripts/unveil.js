export function checkForUnveil() {
    var windowTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
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

export function unveil(event) {
    var image = event.target || event.toElement;

    image.setAttribute('src', image.getAttribute('data-src'));
    image.addEventListener('load', onImageLoad);
    image.removeEventListener('unveil', unveil);
}

export function onImageLoad(event) {
    var image = event.currentTarget;
    var second = new Image();
    second.src = image.getAttribute('data-src-second');
    var loader = image.parentNode.querySelector('.Portrait-loader');
    image.parentNode.querySelector('.Portrait-mask').removeChild(loader);
    image.removeEventListener('load', onImageLoad);
}