import prand from 'pure-rand'

export const createRandomGenerator = (seed: number) => {
	let randomGenerator = prand.xoroshiro128plus(seed)
	const random = (minimum: number, maximum: number) => {
		const [result, newRandomGenerator] = prand.uniformIntDistribution(
			minimum,
			maximum,
			randomGenerator,
		)
		randomGenerator = newRandomGenerator
		return result
	}
	return random
}
