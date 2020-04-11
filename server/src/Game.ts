import { generateId } from './generateId.js'

export class Game {
	public readonly id = generateId()

	constructor(
		public readonly name: string,
		public readonly isPublic: boolean,
	) {}
}
