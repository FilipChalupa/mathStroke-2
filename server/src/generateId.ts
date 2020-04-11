let lastId = 0

export function generateId() {
	// @TODO: make ids unpredictable
	return `i${++lastId}`
}
