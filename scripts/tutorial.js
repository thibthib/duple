export function checkForTutorial(event) {
    event.target.removeEventListener('unveil', displayTutorial);
    var cookieHiding = document.cookie.replace(/(?:(?:^|.*;\s*)hideTutorial\s*\=\s*([^;]*).*$)|^.*$/, '$1') == 'true';
    if (!cookieHiding) {
        var image = event.target || event.toElement;
		var displayOnLoad = function(event) {
            event.target.removeEventListener(event.type, displayOnLoad);
            displayTutorial();
        };
        image.addEventListener('load', displayOnLoad);
    }
}

export function displayTutorial() {
    var language = window.navigator.userLanguage || window.navigator.language;
    var tooltip = document.querySelector('.Tutorial .Tooltip');
    tooltip.style.display = 'inline-block';

    if (language == 'fr') {
        tooltip.innerHTML = 'Appuie pour valser !';
    } else {
        tooltip.innerHTML = 'Press to valse !';
    }
}

export function hideTutorial() {
    var tooltip = document.querySelector('.Tutorial .Tooltip');
    tooltip.style.display = 'none';
    document.cookie = "hideTutorial=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}
