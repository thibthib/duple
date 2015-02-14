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

function onImageLoad(event) {
    var image = event.currentTarget;
    var second = new Image();
    second.src = image.getAttribute('data-src-second');
    var loader = image.parentNode.querySelector('.loader');
    image.parentNode.querySelector('.mask').removeChild(loader);
    image.removeEventListener('load', onImageLoad);
}

function unveil(event) {
    var image = event.target || event.toElement;

    image.setAttribute('src', image.getAttribute('data-src'));
    image.addEventListener('load', onImageLoad);
    image.removeEventListener('unveil', unveil);
}

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

var mainElement = document.querySelector('main');

var portraits = [
    { 'id': 1, 'source': 'Robin-back.jpg', 'secondSource': 'Robin-front.jpg'},
    { 'id': 2, 'source': 'Ingrid-back.jpg', 'secondSource': 'Ingrid-front.jpg'}
];

var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
    if (ajax.readyState === 4 && (ajax.status === 200 || ajax.status === 0)) {
        var template = document.querySelector('.portrait.is-template');

        var loader = ajax.responseXML.documentElement;
        template.querySelector('.mask').appendChild(loader.cloneNode(true));

        for (var i = 0; i < portraits.length; i++) {
            var personne = portraits[i];

            var portraitElement = template.cloneNode(true);
            portraitElement.className = "portrait";

            var mask = portraitElement.querySelector('.mask');
            var id = document.createElement('div');
            mask.appendChild(id);

            var portrait = portraitElement.querySelector('img');
            portrait.setAttribute('data-src', 'images/'+personne.source);
            portrait.setAttribute('data-src-second', 'images/'+personne.secondSource);
            portrait.addEventListener('unveil', unveil);

            mainElement.appendChild(portraitElement);
        }

        checkForUnveil();
    }
};
ajax.open('GET', 'images/loader.svg', true);
ajax.send();

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
