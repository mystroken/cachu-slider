const debounce = require("lodash.debounce");
import Hamster from "hamsterjs";
import CachuSlide from "./slide";
import CachuSlideList from "./slide-list";
import CachuSlideListItem from "./slide-list-item";
import CachuEvent from "./cachu-event";
import CachuNavigation from "./navigation/cachu-navigation";
import CachuNavigationItem from "./navigation/cachu-navigation-item";


const defaultOptions = {
	scrollingSpeed: 1000,
	scrollingLoop: true
};


export default class Cachu {

	constructor(wrapper, options = {}) {
		/**
		 * Setting up the state of
		 * the animator
		 */
		this.state = {
			isInitialized: false,
			isRendered: false,
			isPaused: true,
			isRunning: false,
			isScrolling: false
		};

		/**
		 * Options
		 */
		this.options = Object.assign(defaultOptions, options);

		this.events = {
			after: {
				render: new CachuEvent()
			},
			before: {
				render: new CachuEvent()
			}
		};

		/**
		 * @property {CachuSlideList}
		 */
		this.slideList = new CachuSlideList();

		/**
		 * DOM Elements
		 * manipulated by the animator.
		 */
		this.elements = {
			body: document.querySelector('body'),
			wrapper: wrapper,
			container: wrapper.querySelector('.cachu__sections'),
			sections: wrapper.querySelectorAll('.cachu__section')
		};

		/**
		 * The current slider list item.
		 * @property {CachuSlideListItem}
		 */
		this.currentSlideItem = null;

		/**
		 * Instantiate the slider navigation.
		 */
		this.navigation = new CachuNavigation(this);

		/**
		 * Initialize the system.
		 */
		this.initialize();
	}

	/**
	 * Initializes stuffs for the system.
	 * 		- Instantiating slide items.
	 * 		- Setting the current slide item.
	 */
	initialize() {

		if (false === this.state.isInitialized) {

			this.elements.sections.forEach(element => {
				let navigationItem = new CachuNavigationItem();
				this.navigation.navigationList.add(navigationItem);
				this.slideList.push(new CachuSlide(element, this, navigationItem));
			});

			this.currentSlideItem = this.slideList.head;

			this.state.isInitialized = true;
		}

	}

	/**
	 * Renders the slider.
	 *
	 * @returns { Promise }
	 */
	render() {

		if (false === this.state.isRendered) {
			let promise =
				this.events.before.render.trigger()
					.then(() => this._render())
					.then(() => this.events.after.render.trigger())
			;
			return promise;
		}

		return Promise.resolve();

	}

	/**
	 * @returns { Promise }
	 */
	_render() {
		return new Promise((resolve, reject) => {

			// Rendering the slider.
			this.elements.wrapper.style.overflow = "hidden";
			this.elements.wrapper.style.height = "100%";

			this.elements.container.style.webkitTransition = `-webkit-transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;
			this.elements.container.style.msTransition = `-ms-transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;
			this.elements.container.style.transition = `transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;

			// Attach events.
			const hamster = Hamster(this.elements.container);
			const onMouseWheelDebounced = debounce((event, delta) => this._onMouseWheel(delta), 0, { "maxWait": 1000 });
			hamster.wheel(onMouseWheelDebounced);

			// Hook navigation actions.
			var cachuSlideListItem = this.slideList.head;
			while (cachuSlideListItem) {
				let slideListItem = cachuSlideListItem;
				let slide = slideListItem.slide;
				let slideNavigationItem = slide.navigationItem;
				let slideNavigationItemAnchor = slideNavigationItem.elements.anchor;

				slideNavigationItemAnchor.addEventListener('click', (event) => {
					event.preventDefault();
					//slideNavigationItem.activate();
					this._scrollTo(slideListItem);
					return false;
				});

				cachuSlideListItem = cachuSlideListItem.next;
			}


			// Render the navigation
			this.navigation.render(this.elements.container.parentNode);

			this.elements.container.style.visibility = "visible";

			this.state.isRendered = true;
			resolve(this);
		});
	}

	_onMouseWheel(delta) {
		if (false === this.state.isScrolling) {
			if (delta > 0) this.prev();
			else this.next();
		}
	}

	/**
	 * Run the slider.
	 *
	 * @returns { Promise }
	 */
	run() {
		if (false === this.state.isRunning) {
			// Render first the slider.
			let promise = this.render().then(() => this._run());
			return promise;
		}
		return Promise.resolve();
	}

	/**
	 * @returns { Promise }
	 */
	_run() {
		return new Promise((resolve, reject) => {

			// Run the slider.
			this.currentSlideItem.enter()
			.then(() => {
				this.state.isRunning = true;
				resolve();
			});

		});
	}

	/**
	 * @returns { Promise }
	 */
	prev() {
		let from = this.currentSlideItem;
		let to = this.currentSlideItem.prev;

		// If scrolling loop enabled,
		// we've to scroll to the last slide
		// when the current one is the first.
		if ( (null === to) && (true === this.options.scrollingLoop) && (this.slideList.length > 1) ) {
			to = this.slideList.tail;
		}

		return this._scroll(from, to);
	}

	/**
	 * @returns { Promise }
	 */
	next() {
		let from = this.currentSlideItem;
		let to = this.currentSlideItem.next;

		// If scrolling loop enabled,
		// we've to scroll to the first slide
		// when the current one is the last.
		if ( (null === to) && (true === this.options.scrollingLoop) && (this.slideList.length > 1) ) {
			to = this.slideList.head;
		}

		return this._scroll(from, to);
	}

	_scrollTo(slideItem) {

		if ( (slideItem instanceof CachuSlideListItem) && (this.currentSlideItem != slideItem)) {
			let from = this.currentSlideItem;
			let to = slideItem;
			return this._scroll(from, to);
		}

		return Promise.resolve();
	}

	/**
	 *
	 * @param { CachuSlideListItem } from
	 * @param { CachuSlideListItem } to
	 * @returns { Promise }
	 */
	_scroll(from, to) {
		if ((false === this.state.isScrolling) && from && to) {

			this.state.isScrolling = true;
			//console.info(`Start leaving Slide ${from.index}...`);

			let promise =
			from.leave()
				.then(() => {
					//console.info(`Slide ${from.index} leaved!`);
					//console.info(`Start entering Slide ${to.index}...`);
					return to.enter();
				})
				.then(() => {
					//console.info(`Slide ${to.index} entered!`);
					this.currentSlideItem = to;
					this.state.isScrolling = false;
				})
			;
			return promise;
		}
		return Promise.resolve();
	}

	destroy() {
		// Reset the wrapper attribute.
		this.elements.wrapper.style.overflow = "auto";
		this.elements.wrapper.style.height = "auto";
	}
}
