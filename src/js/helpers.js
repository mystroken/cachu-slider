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
 * @param { HTMLAllCollection } sections
 */
export function getSectionsMaxHeight(sections) {
	let maxHeight = 0;

	sections.forEach(section => {
		const height = getOuterHeight(section);
		if ( height > maxHeight ) maxHeight = height;
	});

	return maxHeight;
}

/**
 * @param {HTMLAllCollection} sections
 * @param {int} height
 */
export const setSectionsHeight = (sections, height) => {
	sections.forEach(section => {
		section.style.height = height + "px";
	});
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
}

/**
 * Removes a classname from an element.
 *
 * @param {HTMLElement} el
 * @param {string} className
 */
export function removeClass(el, className) {
	if (el.classList) el.classList.remove(className);
	else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
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
