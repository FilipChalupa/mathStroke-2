export type LevelTask = ReturnType<typeof createLevelTask>

export const createLevelTask = (
	speedMultiplier: number,
	playerCountMultiplier: number,
	onDamageHit: (shieldDamage: number) => void,
	onFinished: () => void,
) => {
	// @TODO: change to something more meaningful
	const timer = setTimeout(() => {
		onFinished()
	}, 1000)
	const timer2 = setTimeout(() => {
		if (Math.random() < 0.5) {
			onDamageHit(Math.random() < 0.5 ? 1 : 2)
		}
	}, 500)

	const destroy = () => {
		clearTimeout(timer)
		clearTimeout(timer2)
	}

	return {
		destroy,
	}
}
