import CachuEvent from "./cachu-event";
import {
	addClass,
	removeClass,
	whichTransitionEvent
} from "./helpers";

export default class CachuSlide {
	constructor(section, slider, navigationItem) {

		this.index = 0;

		/**
		 * Setting up the state of
		 * the animator
		 */
		this.state = {
			isInitialized: false,
			isPlaying: false
		};

		this._actions = {
			enter: new CachuEvent(),
			leave: new CachuEvent()
		};

		this.events = {
			after: {
				enter: new CachuEvent(),
				leave: new CachuEvent()
			},
			before: {
				enter: new CachuEvent(),
				leave: new CachuEvent()
			}
		};

		/**
		 * DOM Elements
		 * manipulated by the animator.
		 */
		this.elements = {
			section: section
		};

		/**
		 * Get the current slider.
		 */
		this.slider = slider;

		/**
		 * The attached navigation item.
		 * @property { CachuNavigationItem }
		 */
		this.navigationItem = navigationItem;

		// Initiailze the slide
		this._initialize();
	}

	_enter() {
		return new Promise((resolve, reject) => {

			// Attach the event listener for resolving after
			// scrolling transition, if it's necessary.
			if (this.slider.options.scrollingSpeed > 0) {
				let transitionEvent = whichTransitionEvent();

				this.slider.elements.container.addEventListener(transitionEvent, (e) => {
					e = window.event || e;
					e.cancelBubble = true;
					e.stopPropagation();

					if (e.target === this.slider.elements.container) {
						//addClass(this.elements.section, "active");
						resolve();
					}
				}, false);
			}

			// Slide the container to the correct viewport.
			this.slider.slideContainer( this.index );

			// If the scrolling speed is not
			// greater than zero, resolve immediatly.
			if (this.slider.options.scrollingSpeed <= 0) {
				resolve();
			}

		});
	}

	_leave() {

		return new Promise((resolve, reject) => {
			this.deactivate();
			resolve();
		});
	}

	deactivate() {
		//removeClass(this.elements.section, "active");
	}

	_initialize() {
	}
}
