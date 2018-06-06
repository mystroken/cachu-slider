import CachuNavigationList from "./cachu-navigation-list";

export default class CachuNavigation {

	constructor() {

		this.navigationList = new CachuNavigationList();

		/**
		 * Manipulated DOM Elements.
		 */
		this.elements = {
			container: document.createElement("div")
		};

		// Initializes the navigation.
		this.initialize();
	}

	/**
	 * Initialize the navigation.
	 */
	initialize() {

		// Set the container
		this.elements.container.setAttribute("id", "cachu-nav");
		this.elements.container.classList.add("cachu__nav");
	}

	/**
	 * Insert navigation to the DOM.
	 */
	render(parentNode = null) {
		// Retrieve the Navigation Items from the list.
		this.elements.container.appendChild(this.navigationList.generateNodeList());

		// Insert to DOM.
		if (null === parentNode) document.body.appendChild(this.elements.container);
		else parentNode.appendChild(this.elements.container);
	}
}
