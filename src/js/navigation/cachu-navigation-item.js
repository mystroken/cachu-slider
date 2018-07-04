import { addClass, removeClass } from "../helpers";


export default class CachuNavigationItem {
	constructor(index = 0) {

		this.index = index;

		/**
		 * Setting up the state
		 */
		this.state = {
			isInitialize: false
		};

		/**
		 * Manipulated DOM Elements.
		 */
		this.elements = {
			container: document.createElement("li"),
			anchor: document.createElement("a"),
			span: document.createElement("span"),
			tooltip: document.createElement("span")
		};

		// Init the stuff
		this.initialize();
	}

	initialize() {
		// Initializes the Tooltip.
		addClass(this.elements.tooltip, "cachu__nav__tooltip");

		// Initializes the span.
		// Nothing to do for the moment.

		// Initializes the anchor.
		addClass(this.elements.anchor, "cachu__nav__button");
		//this.elements.anchor.appendChild(this.elements.span);

		// Initalizes the list item element.
		addClass(this.elements.container, "cachu__nav__item");
		// Append tooltip if it exists.
		this.elements.container.appendChild( this.elements.tooltip );
		this.elements.container.appendChild( this.elements.anchor );
	}

	/**
	 * @returns {Node}
	 */
	getNodeElement() {
		return this.elements.container;
	}

	/**
	 * Adds a text to the tooltip.
	 *
	 * @param {string} text
	 */
	setTooltip(text) {
		this.elements.tooltip.innerText = text;
	}

	activate() {
		addClass(this.elements.container, "active");
	}

	deactivate() {
		removeClass(this.elements.container, "active");
	}

}
