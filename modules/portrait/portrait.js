import templateString from './portrait.html';
import './portrait.less';

const getDOMfromString = (string) => {
	var div = document.createElement('div');
	div.innerHTML = string;
	return div.firstChild;
}

export default ({ id, name }) => {
	const state = {
		element: getDOMfromString(templateString),
		id,
		name
	}
	
	state.frontSource = require('../../images/'+name+'-front.jpg');
	state.backSource = require('../../images/'+name+'-back.jpg');
	
	state.element.querySelector('.Portrait-id').textContent = '#' + ('00' + id).substr(-3);
	
	const preloadFront = () => {
		const loader = state.element.querySelector('.Portrait-loader');
    	state.element.querySelector('.Portrait-mask').removeChild(loader);
		state.image.removeEventListener('load', preloadFront);
	    const frontImage = new Image();
	    frontImage.src = state.frontSource;
	}
	
	const unveil = () => {
		state.element.removeEventListener('unveil', unveil);
		const image = `<img src="${state.backSource}">`;
		state.image = getDOMfromString(image);
		state.image.addEventListener('load', preloadFront);
		state.element.appendChild(state.image);
	}
	state.element.addEventListener('unveil', unveil);
	
	const showFront = () => {
		state.image.setAttribute('src', state.frontSource);
	}
	
	const showBack = () => {
		state.image.setAttribute('src', state.backSource);
	}
	
    var mask = state.element.querySelector('.Portrait-mask');
	
	if ("ontouchstart" in window) {
	    mask.addEventListener('touchstart', () => {
			state.valseTimer = setTimeout(() => { showFront() }, 100);
		});
	    mask.addEventListener('touchleave', showBack);
	    mask.addEventListener('touchend', showBack);
	    mask.addEventListener('touchmove', () => {
			clearTimeout(state.valseTimer);
		});
	} else {
	    mask.addEventListener('mousedown', showFront);
	    mask.addEventListener('mouseleave', showBack);
	    mask.addEventListener('mouseup', showBack);
	}
	
	return state.element;
}
