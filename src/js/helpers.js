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

export var Skrllr = (function(document) {
	var Lethargy = require('lethargy').Lethargy;

	var s = {},
	lethargy = new Lethargy(),
	el = document,
	numListeners,
	listeners = [],
	initialized = false;

	// How many pixels to move with each key press
	var keyStep = 120,
	bodyTouchAction,
	touchStartX,
	touchStartY;

	var hasWheelEvent = 'onwheel' in document;
	var hasMouseWheelEvent = 'onmousewheel' in document;
	var hasTouch = 'ontouchstart' in document;
	var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
	var hasPointer = !!window.navigator.msPointerEnabled;
	var hasKeyDown = 'onkeydown' in document;

	var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

	var event = {
		x: 0,
		y: 0,
		deltaX: 0,
		deltaY: 0,
		originalEvent: null
	};

	s.init = function(options) {
		el = options.el;
	}

	var notify = function(e) {
		event.x += event.deltaX;
		event.y += event.deltaY;
		event.originalEvent = e;

		for(var i = 0; i < numListeners; i++) listeners[i](event);
	};

	var onWheel = function(e) {
		if (lethargy.check(e) === false) return;
		// In Chrome and in Firefox (at least the new one)
		event.deltaX = e.wheelDeltaX || e.deltaX * -1;
		event.deltaY = e.wheelDeltaY || e.deltaY * -1;

		notify(e);
	}

	var onMouseWheel = function(e) {
		if (lethargy.check(e) === false) return;
		// In Safari, IE and in Chrome if 'wheel' isn't defined
		event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
		event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

		notify(e);
	}

	var onTouchStart = function(e) {
		var t = (e.targetTouches) ? e.targetTouches[0] : e;
		touchStartX = t.pageX;
		touchStartY = t.pageY;
	}

	var onTouchMove = function(e) {
		// e.preventDefault(); // < This needs to be managed externally
		var t = (e.targetTouches) ? e.targetTouches[0] : e;

		event.deltaX = (t.pageX - touchStartX);
		event.deltaY = (t.pageY - touchStartY);

		touchStartX = t.pageX;
		touchStartY = t.pageY;

		notify(e);
	}

	var onKeyDown = function(e) {
		// 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
		event.deltaX = event.deltaY = 0;
		switch(e.keyCode) {
			case 37:
				event.deltaX = -keyStep;
				break;
			case 39:
				event.deltaX = keyStep;
				break;
			case 38:
				event.deltaY = keyStep;
				break;
			case 40:
				event.deltaY = -keyStep;
				break;
		}

		notify(e);
	}

	var attachEventListeners = function() {
		if(hasWheelEvent) el.addEventListener("wheel", onWheel);
		if(hasMouseWheelEvent) el.addEventListener("mousewheel", onMouseWheel);

		if(hasTouch) {
			el.addEventListener("touchstart", onTouchStart);
			el.addEventListener("touchmove", onTouchMove);
		}

		if(hasPointer && hasTouchWin) {
			bodyTouchAction = el.body.style.msTouchAction;
			document.body.style.msTouchAction = "none";
			el.addEventListener("MSPointerDown", onTouchStart, true);
			el.addEventListener("MSPointerMove", onTouchMove, true);
		}

		if(hasKeyDown) document.addEventListener("keydown", onKeyDown);

		initialized = true;
	};

	var destroyEventListeners = function() {
		if(hasWheelEvent) el.removeEventListener("wheel", onWheel);
		if(hasMouseWheelEvent) el.removeEventListener("mousewheel", onMouseWheel);

		if(hasTouch) {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchmove", onTouchMove);
		}

		if(hasPointer && hasTouchWin) {
			document.body.style.msTouchAction = bodyTouchAction;
			el.removeEventListener("MSPointerDown", onTouchStart, true);
			el.removeEventListener("MSPointerMove", onTouchMove, true);
		}

		if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

		initialized = false;
	};

	s.on = function(f) {
		if ( ! initialized ) attachEventListeners();
		listeners.push(f);
		numListeners = listeners.length;
	};

	s.off = function(f) {
		listeners.splice(f, 1);
		numListeners = listeners.length;
		if (numListeners <= 0) destroyEventListeners();
	};

	s.destroy = function() {
		destroyEventListeners();
	}

	return s;

})(document);
