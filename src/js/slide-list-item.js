export default class CachuSlideListItem {
	/**
	 *
	 * @param {CachuSlide} slide
	 */
	constructor(slide, index = 0) {
		this.index = index;
		this.slide = slide;
		this.next = null;
		this.prev = null;
	}

	enter() {

		this.slide.navigationItem.activate();

		let promise =
			// Trigger the before enter event
			this.slide.events.before.enter.trigger("!!!Trigger before entering!!!")
			// Manage the entering
			.then(() => {
				return this.slide._enter();
			})
			// Trigger the after enter event
			.then(() => {
				return this.slide.events.after.enter.trigger("!!!Trigger after entering!!!");
			})
		;

		return promise;
	}


	leave() {

		this.slide.navigationItem.deactivate();

		let promise =
			// Trigger the before enter event
			this.slide.events.before.leave.trigger("!!!Trigger before leaving!!!")
			// Manage the entering of the slide
			.then(() => {
				return this.slide._leave();
			})
			// Trigger the after enter event
			.then(() => {
				return this.slide.events.after.leave.trigger("!!!Trigger after leaving!!!");
			})
		;

		return promise;
	}

	setIndex(index) {
		this.index = index;
		this.slide.index = index;
		this.slide.navigationItem.index = index;
	}
}
