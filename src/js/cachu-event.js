
export default class CachuEvent {
	constructor() {
		this.handlers = []; // Observers
	}

	/**
	 * Adds an event handler.
	 *
	 * @param {function} fn
	 */
	addListener(fn) {
		this.handlers.push(fn);
		return this;
	}

	/**
	 * Removes an event handler.
	 *
	 * @param {function} fn
	 */
	removeListener(fn) {
		this.handlers = this.handlers.filter(handler => {
			if (handler !== fn) {
				return handler;
			}
		});

		return this;
	}

	/**
	 * Triggers the event and calls
	 * all the handlers.
	 *
	 * @param {*} o
	 * @param {*} thisObj
	 * @returns {Promise}
	 */
	trigger(o = undefined, thisObj = window) {
		let promise = Promise.all(this.handlers.map((promise) => promise()));
		return promise;
	}
}
