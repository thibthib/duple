export function checkForUnveil() {
    var windowTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    var windowBottom = windowTop + window.innerHeight;
    var images = document.querySelectorAll('.Portrait');

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
