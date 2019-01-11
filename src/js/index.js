const debounce = require("lodash.debounce");
import CachuSlide from "./slide";
import CachuSlideList from "./slide-list";
import CachuSlideListItem from "./slide-list-item";
import CachuEvent from "./cachu-event";
import CachuNavigation from "./navigation/cachu-navigation";
import CachuNavigationItem from "./navigation/cachu-navigation-item";
import {
	CACHU_MODE_FULL_PAGE,
	CACHU_MODE_CONTENT_FIT,
	hasClass,
	getOuterHeight,
	getSectionsMaxHeight,
	setSectionsHeight,
	getOuterWidth,
	setSectionsWidth,
	removeClass,
	addClass,
	optimizedResize,
	Skrllr
} from "./helpers";


const defaultOptions = {
  disableMouseEvents: false, // Disable mousewheel event listening.
  disableKeyboardEvents: false, // Disable keyboard event listening.
  disableTouchEvents: false, // Disable event listening on touchable device (Swipe).
	scrollingSpeed: 1000,  // The speed of the transition.
	scrollingLoop: true,  // Loop after reaching the end.
	scrollingDirection: 'vertical',  // Loop after reaching the end.
	fixSectionsHeight: true, // Sets or not a same height to all sections.
  navigationEnabled: true, // Enable navigation buttons
  navigationPosition: 'right'  // The Navigation's position
};


export default class Cachu {

	constructor(wrapper, options = {}) {
		/**
		 * Setting up the state of
		 * the animator
		 */
		this.state = {
			mode: CACHU_MODE_FULL_PAGE, // Default mode.
			isInitialized: false,
			isRendered: false,
			isPaused: true,
			isRunning: false,
			isScrolling: false,
			wrapperHeight: 0,
			wrapperWidth: 0
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

			// Set mode
			this.state.mode = this._detectMode();

			for(let i = 0; i < this.elements.sections.length; i++) {
				let element = this.elements.sections[i];

				let navigationItem = new CachuNavigationItem();
				this.navigation.navigationList.add(navigationItem);
				this.slideList.push(new CachuSlide(element, this, navigationItem));
			}

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

			// Hydrate the slider wrapper.
			this._hydrateSlider();

			this.elements.container.style.webkitTransition = `-webkit-transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;
			this.elements.container.style.msTransition = `-ms-transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;
			this.elements.container.style.transition = `transform ${this.options.scrollingSpeed}ms cubic-bezier(.56,.12,.12,.98)`;

			// Attach events.
			Skrllr.init({
				el: this.elements.container,
				listenMouseWheelEvent: !this.options.disableMouseEvents,
				listenKeyboardEvent: !this.options.disableKeyboardEvents,
				listenTouchEvent: !this.options.disableTouchEvents
			});
			Skrllr.on(debounce((event) => this._onScrollEvents(event), 0, { "maxWait": 1500 }));

			optimizedResize.add( () => {
				this._positionateOnViewport();
			});

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
			if ( true === this.options.navigationEnabled ) this.navigation.render(this.elements.wrapper, this.options.navigationPosition);

			this.elements.container.style.visibility = "visible";

			this.state.isRendered = true;
			resolve(this);
		});
	}

	_onScrollEvents(event) {
		if (false === this.state.isScrolling) {

			const { mode } = this.state;
			const { scrollingDirection } = this.options;
			const { deltaX, deltaY } = event;

			if (mode === CACHU_MODE_FULL_PAGE) {
				if (deltaY > 0 || deltaX > 0) this.prev();
				else if (deltaY < 0 || deltaX < 0) this.next();
			} else if (mode === CACHU_MODE_CONTENT_FIT) {
				const deltaValue = (scrollingDirection === 'horizontal') ? deltaX : deltaY;
				if (deltaValue > 12) this.prev();
				else if (deltaValue < -12) this.next();
			}

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
					from.slide.elements.section.style.visibility = "hidden";
					//console.info(`Slide ${to.index} entered!`);
					this.currentSlideItem = to;
					this.state.isScrolling = false;
				})
			;
			return promise;
		}
		return Promise.resolve();
	}

	_hydrateSlider() {

		this._positionateOnViewport();

		// Set the scrolling direction
		if ( this.options.scrollingDirection === 'vertical' ) {
			removeClass( this.elements.container, 'cachu__sections--horizontal' );
		} else if ( this.options.scrollingDirection === 'horizontal' ) {
			addClass( this.elements.container, 'cachu__sections--horizontal' );
		}
	}

	_positionateOnViewport() {
		// First, we should find an apropriate
		// height for the wrapper.
		// Then we'll force each section to fit that height.

		// Get the wrapper width.
		this.state.wrapperWidth = getOuterWidth( this.elements.container );

		// Get the apropriate height of the wrapper.
		this.state.wrapperHeight = ( CACHU_MODE_CONTENT_FIT === this.state.mode )
			? getSectionsMaxHeight(this.elements.sections)
			: getOuterHeight(this.elements.wrapper)
		;

		/*
		|------------------------------
		| Vertical scrolling
		|------------------------------
		*/
		if ( this.options.scrollingDirection === 'vertical' ) {
			this.elements.wrapper.style.overflowY = "hidden";

			// Fix the height and the width of each section.
			setSectionsHeight( this.elements.sections, this.state.wrapperHeight );
			setSectionsWidth( this.elements.sections, this.state.wrapperWidth );
		}
		/*
		|------------------------------
		| Horizontal scrolling
		|------------------------------
		*/
		else if ( this.options.scrollingDirection === 'horizontal' ) {
			this.elements.wrapper.style.overflowX = "hidden";

			// Fix the wrapper height and hide overflow.
			if ( true === this.options.fixSectionsHeight ) this.elements.wrapper.style.height = this.state.wrapperHeight + "px";

			// Fix the height and the width of each section.
			if ( true === this.options.fixSectionsHeight ) setSectionsHeight( this.elements.sections, this.state.wrapperHeight );
			setSectionsWidth( this.elements.sections, this.state.wrapperWidth );
		}

		this.elements.wrapper.style.overflow = "hidden";
	}

	_dehydrateSlider() {
		this.state.wrapperHeight = 0;

		// Reset the wrapper attribute.
		this.elements.wrapper.style.height = "auto";
		this.elements.wrapper.style.overflow = "auto";
	}

	_detectMode() {
		return ( true === hasClass(this.elements.wrapper, "cachu__container--content-fit") )
			? CACHU_MODE_CONTENT_FIT
			: CACHU_MODE_FULL_PAGE
		;
	}

	slideContainer( section, index = 1 ) {

		let translateX = 0;
		let translateY = 0;

		if ( this.options.scrollingDirection === 'vertical' ) {
			translateY = (-1 * this.state.wrapperHeight) * (index - 1);
		}
		else if ( this.options.scrollingDirection === 'horizontal' ) {
			translateX = (-1 * this.state.wrapperWidth) * (index - 1);
			if ( false === this.options.fixSectionsHeight ) this.elements.container.style.height = getOuterHeight( section ) + 'px';
		}

		this.elements.container.style.transform = "translate3d("+translateX+"px,"+translateY+"px,0px)";
	}

	destroy() {
		Skrllr.destroy();
		this._dehydrateSlider();
	}
}
