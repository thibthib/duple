import '../styles/main.less';
import portraits from '../images/portraits.json';
import { valse, cancelValse } from './valse.js';
import { unveil, checkForUnveil } from './unveil.js';
import { checkForTutorial } from './tutorial.js';

var template = document.querySelector('.Portrait.is-template');
var mainElement = document.querySelector('main');

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
    portrait.setAttribute('data-src', require('../images/'+personne.name+'-back.jpg'));
    portrait.setAttribute('data-src-second', require('../images/'+personne.name+'-front.jpg'));
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
