import prand from 'pure-rand'

const allowedCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const idLength = 6
const seed = 314
let randomGenerator = prand.xoroshiro128plus(seed)
const random = () => {
	const [result, newRandomGenerator] = prand.uniformIntDistribution(
		0,
		allowedCharacters.length - 1,
		randomGenerator,
	)
	randomGenerator = newRandomGenerator
	return result
}

export const generateRoomId = () => {
	return new Array(idLength)
		.fill(null)
		.map(() => allowedCharacters[random()])
		.join('')
}
