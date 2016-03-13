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
	
	state.images = [480, 640, 800, 1080, 1280].map(size => {
		return {
			back: `assets/${state.name}-back-${size}w.jpg`,
			front: `assets/${state.name}-front-${size}w.jpg`,
			size
		}
	});
	
	state.element.querySelector('.Portrait-id').textContent = '#' + ('00' + id).substr(-3);
	
	const getSrcset = (face) => {
		return state.images.map(image => `${image[face]} ${image.size}w`).join(',');
	}
	
	const preloadFront = () => {
		const loader = state.element.querySelector('.Portrait-loader');
    	state.element.querySelector('.Portrait-mask').removeChild(loader);
		state.image.removeEventListener('load', preloadFront);
	    const frontImage = new Image();
		frontImage.srcset = getSrcset('front');
	    frontImage.src = state.images[0].front;
	}
	
	const unveil = () => {
		state.element.removeEventListener('unveil', unveil);
		const srcset = getSrcset('back');
		const image = `<img src="${state.images[0].back}" srcset="${srcset}" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw">`;
		state.image = getDOMfromString(image);
		state.image.addEventListener('load', preloadFront);
		state.element.appendChild(state.image);
	}
	state.element.addEventListener('unveil', unveil);
	
	const showFront = () => {
		state.image.setAttribute('srcset', getSrcset('front'));
		state.image.setAttribute('src', state.images[0].front);
	}
	
	const showBack = () => {
		state.image.setAttribute('srcset', getSrcset('back'));
		state.image.setAttribute('src', state.images[0].back);
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
