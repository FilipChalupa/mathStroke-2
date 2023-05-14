import { createRandomGenerator } from './createRandomGenerator'

const allowedCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const idLength = 4
const seed = 314
const random = createRandomGenerator(seed)

export const generateRoomId = () => {
	return new Array(idLength)
		.fill(null)
		.map(() => allowedCharacters[random(0, allowedCharacters.length - 1)])
		.join('')
}
