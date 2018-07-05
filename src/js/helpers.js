// Constants
export const CACHU_MODE_FULL_PAGE = "fullpage";
export const CACHU_MODE_CONTENT_FIT = "content-fit";

// Function from David Walsh: http://davidwalsh.name/css-animation-callback
export function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}


export function whichAnimationEvent(){
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

/**
 *
 * @param {NodeList} sections
 */
export function getSectionsMaxHeight(sections) {
	let maxHeight = 0;

	for(let i = 0; i < sections.length; i++) {
		let section = sections[i];
		const height = getOuterHeight(section);
		if ( height > maxHeight ) maxHeight = height;
	}

	return maxHeight;
}

/**
 * @param {NodeList} sections
 * @param {int} height
 */
export const setSectionsHeight = (sections, height) => {
	for(let i = 0; i < sections.length; i++) {
		let section = sections[i];
		section.style.height = height + "px";
	}
}

/**
 * @param {NodeList} sections
 * @param {int} width
 */
export const setSectionsWidth = (sections, width) => {
	for(let i = 0; i < sections.length; i++) {
		let section = sections[i];
		section.style.width = width + "px";
	}
}

/**
 * Adds a classname to an element.
 *
 * @param {HTMLElement} el
 * @param {string} className
 */
export function addClass(el, className) {
	if (el.classList) el.classList.add(className);
	else el.className += ' ' + className;
	return el;
}

/**
 * Removes a classname from an element.
 *
 * @param {HTMLElement} el
 * @param {string} className
 */
export const removeClass = (el, className) => {
	//console.log(el);
	if (el.classList) el.classList.remove(className);
	else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	return el;
}

/**
 * Checks if an elements has a specific classname.
 *
 * @param {HTMLElement} el
 * @param {string} className
 */
export const hasClass = (el, className) => (el.classList) ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

/**
 * Returns the outer height of an element.
 *
 * @param {HTMLElement} el
 */
export const getOuterHeight = el => {
  let height = el.offsetHeight;
	const style = getComputedStyle(el);

	height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

/**
 * @param {HTMLElement} el
 */
export const getOuterWidth = el => {
	let width = el.offsetWidth;
	const style = getComputedStyle(el);

	width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	return width;
}


export var optimizedResize = (function() {

	var callbacks = [], running = false;

	// fired on resize event
	function resize() {

		if ( ! running ) {
			running = true;

			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(runCallbacks);
			} else {
				setTimeout(runCallbacks, 66);
			}
		}

	}

	// run the actual call    backs
	function runCallbacks() {

		callbacks.forEach(function(callback) {
			callback();
		});

		running = false;
	}

	// adds callback to loop
	function addCallback(callback) {

		if ( callback ) {
			callbacks.push(callback);
		}

	}

	return {
		// public method to add additional callback
		add: function(callback) {
			if (!callbacks.length) {
				window.addEventListener('resize', resize);
			}
			addCallback(callback);
		}
	}
}());
