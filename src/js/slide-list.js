import CachuSlide from "./slide";
import CachuSlideListItem from "./slide-list-item";

export default class CachuSlideList {

	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	/**
	 *
	 * @param { CachuSlide } slide
	 */
	push(slide) {

		if (!slide) return this;

		let newSlide = new CachuSlideListItem(slide);
		newSlide.prev = this.tail;

		if (this.tail) this.tail.next = newSlide;
		else this.head = newSlide;

		this.tail = newSlide;
		newSlide.setIndex(this.length + 1);

		this.length++;
		return this;
	}

	/**
	 * @returns { CachuSlide|null }
	 */
	pop() {
		if (!this.tail) return null;

		let slide = this.tail.slide;
		this.tail = this.tail.prev;

		if (this.tail) this.tail.next = null;
		else this.head = null;

		return slide;
	}

	/**
	 *
	 * @param { CachuSlide | int} slide
	 * @returns { CachuSlideListItem }
	 */
	find(slide) {
		let thisListItem = this.head;
		let slideIntVal = parseInt(slide);

		while(thisListItem) {

			if ( slideIntVal > 0 ) {
				if(thisListItem.index === slideIntVal) {
					return thisListItem;
				}
			} else {
				if(thisListItem.slide === slide) {
					return thisListItem;
				}
			}

			thisListItem = thisListItem.next;
		}

		return thisListItem;
	}
}
