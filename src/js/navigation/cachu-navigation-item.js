

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
			tooltip: document.createElement("div")
		};

		// Init the stuff
		this.initialize();
	}

	initialize() {
		// Initializes the Tooltip.
		this.elements.tooltip.classList.add("cachu__nav__tooltip");

		// Initializes the span.
		// Nothing to do for the moment.

		// Initializes the anchor.
		this.elements.anchor.appendChild(this.elements.span);

		// Initalizes the list item element.
		this.elements.container.appendChild(this.elements.anchor);
		this.elements.container.appendChild(this.elements.tooltip);
	}

	/**
	 * @returns {Node}
	 */
	getNodeElement() {
		return this.elements.container;
	}

	activate() {
		this.elements.anchor.classList.add("active");
	}

	deactivate() {
		this.elements.anchor.classList.remove("active");
	}

}
