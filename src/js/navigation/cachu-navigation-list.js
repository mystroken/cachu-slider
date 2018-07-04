import CachuNavigationItem from "./cachu-navigation-item";
import { addClass, removeClass } from "../helpers";

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
		addClass(this.elements.container, "cachu__nav__items");

		this.items.forEach((item) => {

			this.elements.container.appendChild(item.elements.container);

			item.elements.container.addEventListener('mouseover', (e) => {
				this.items.forEach( el => addClass(el.elements.container, 'dismissed') );
				removeClass(item.elements.container, 'dismissed');
				addClass(item.elements.container, 'mouseover');
			});

			item.elements.container.addEventListener('mouseout', e => {
				this.items.forEach( el => removeClass(el.elements.container, 'dismissed') );
				removeClass(item.elements.container, 'mouseover');
			});
		});

		return this.elements.container;
	}
}
