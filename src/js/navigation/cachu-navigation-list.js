import CachuNavigationItem from "./cachu-navigation-item";

export default class CachuNavigationList {
	constructor() {
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
			container: document.createElement("ul")
		};

		/**
		 * Set of CachuNavigationItems.
		 */
		this.items = new Set();
	}

	has(item) {
		return this.items.has(item);
	}

	add(item) {

		if (item instanceof CachuNavigationItem) {
			return this.items.add(item);
		}

		return this;
	}

	delete(item) {
		return this.items.delete(item);
	}

	forEach(fn) {
		return this.items.forEach(fn);
	}


	generateNodeList() {
		this.items.forEach((item) => {
			this.elements.container.appendChild(item.elements.container);
		});

		return this.elements.container;
	}
}
