import '../styles/main.less';
import portraits from '../images/portraits.json';
import { checkForUnveil } from './unveil.js';
import { checkForTutorial } from './tutorial.js';
import Portrait from '../modules/portrait/portrait.js';

var mainElement = document.querySelector('main');

for (var i = 0; i < portraits.length; i++) {
    var personne = portraits[i];
    const portrait = Portrait(personne);

    if (i === 0) {
        portrait.addEventListener('unveil', checkForTutorial);
    }
    mainElement.appendChild(portrait);
}

checkForUnveil();

window.onscroll = checkForUnveil;
window.onresize = checkForUnveil;
