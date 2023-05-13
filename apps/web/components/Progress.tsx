import { LinearProgress } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { getTime } from '../utilities/getTime'
import styles from './Progress.module.css'

export interface ProgressProps {
	startAt: number
	stoppedAt?: number
	duration: number
}

const calculateProgress = (
	start: number,
	current: number,
	duration: number,
) => {
	const elapsed = current - start
	const progress = Math.min(1, elapsed / duration)
	return progress
}

export const Progress: FunctionComponent<ProgressProps> = ({
	startAt,
	stoppedAt,
	duration,
}) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (stoppedAt) {
			setProgress(calculateProgress(startAt, stoppedAt, duration))
			return
		}
		let timer: ReturnType<typeof requestAnimationFrame>
		const loop = () => {
			const now = getTime()
			const progress = calculateProgress(startAt, now, duration)
			setProgress(progress)
			if (progress < 1) {
				timer = requestAnimationFrame(loop)
			}
		}
		loop()

		return () => {
			cancelAnimationFrame(timer)
		}
	}, [duration, startAt, stoppedAt])

	return (
		<LinearProgress
			color={progress < 0.5 ? 'primary' : progress < 0.8 ? 'warning' : 'error'}
			variant="determinate"
			value={progress * 100}
			classes={{
				bar: styles.bar,
			}}
		/>
	)
}
