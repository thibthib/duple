function checkForUnveil() {
    //var windowTop = window.scrollY;
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

function onImageLoad(event) {
    var image = event.currentTarget;
    var second = new Image();
    second.src = image.getAttribute('data-src-second');
    var loader = image.parentNode.querySelector('.Portrait-loader');
    image.parentNode.querySelector('.Portrait-mask').removeChild(loader);
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

function cancelValse(event) {
    window.clearTimeout(valseTimer);
}

function checkForTutorial(event) {
    portrait.removeEventListener('unveil', displayTutorial);
    var cookieHiding = document.cookie.replace(/(?:(?:^|.*;\s*)hideTutorial\s*\=\s*([^;]*).*$)|^.*$/, '$1') == 'true';
    if (!cookieHiding) {
        var image = event.target || event.toElement;
        image.addEventListener('load', function(event) {
            event.target.removeEventListener(event.type, arguments.callee);
            displayTutorial();
        });
    }
}

function displayTutorial() {
    var language = window.navigator.userLanguage || window.navigator.language;
    var tooltip = document.querySelector('.Tutorial .Tooltip');
    tooltip.style.display = 'inline-block';

    if (language == 'fr') {
        tooltip.innerHTML = 'Appuie pour valser !';
    } else {
        tooltip.innerHTML = 'Press to valse !';
    }
}

function hideTutorial() {
    var tooltip = document.querySelector('.Tutorial .Tooltip');
    tooltip.style.display = 'none';
    document.cookie = "hideTutorial=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

var mainElement = document.querySelector('main');

var portraits = [
    { 'id': 5, 'source': 'Fanny-back.jpg', 'secondSource': 'Fanny-front.jpg'},
    { 'id': 4, 'source': 'Laurent-back.jpg', 'secondSource': 'Laurent-front.jpg'},
    { 'id': 3, 'source': 'Edern-back.jpg', 'secondSource': 'Edern-front.jpg'},
    { 'id': 2, 'source': 'Ingrid-back.jpg', 'secondSource': 'Ingrid-front.jpg'},
    { 'id': 1, 'source': 'Robin-back.jpg', 'secondSource': 'Robin-front.jpg'}
];

var template = document.querySelector('.Portrait.is-template');

for (var i = 0; i < portraits.length; i++) {
    var personne = portraits[i];

    var portraitElement = template.cloneNode(true);
    portraitElement.className = "Portrait";

    var idElement = portraitElement.querySelector('.Portrait-id');
    idElement.textContent = '#' + ('00' + personne.id).substr(-3);

    var mask = portraitElement.querySelector('.Portrait-mask');
    mask.appendChild(idElement);
    mask.addEventListener('mouseleave', valse);

    var portrait = portraitElement.querySelector('img');
    portrait.setAttribute('data-src', 'assets/images/'+personne.source);
    portrait.setAttribute('data-src-second', 'assets/images/'+personne.secondSource);
    portrait.addEventListener('unveil', unveil);

    if (i === 0) {
        portrait.addEventListener('unveil', checkForTutorial);
    }

    mainElement.appendChild(portraitElement);
}

checkForUnveil();

if ("ontouchstart" in window) {
    mainElement.addEventListener('touchstart', valse);
    mainElement.addEventListener('touchleave', valse);
    mainElement.addEventListener('touchend', valse);

    var valseTimer;
    mainElement.addEventListener('touchmove', cancelValse);
} else {
    mainElement.addEventListener('mousedown', valse);
    //mainElement.addEventListener('mouseleave', valse);
    mainElement.addEventListener('mouseup', valse);
}

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;
