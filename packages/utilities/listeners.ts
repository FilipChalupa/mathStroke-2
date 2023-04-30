// @TODO: move to utilities package
// @TODO: optional emit of last value on addListener

export const createListenable = <
	CallbackParameters extends unknown[] = [],
>() => {
	type Callback = (...parameters: CallbackParameters) => void
	let listeners: Callback[] = []

	const addListener = (callback: Callback) => {
		listeners.push(callback)
	}
	const removeListener = (callback: Callback) => {
		listeners = listeners.filter((listener) => listener !== callback)
	}

	const emit = (...parameters: CallbackParameters) => {
		listeners.forEach((listener) => listener.apply(null, parameters))
	}

	return {
		addListener,
		removeListener,
		emit,
	}
}
