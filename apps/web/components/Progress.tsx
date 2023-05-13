import { CSSProperties, FunctionComponent, useEffect, useState } from 'react'
import { getTime } from '../utilities/getTime'
import styles from './Progress.module.css'

export interface ProgressProps {
	startAt: number
	duration: number
}

export const Progress: FunctionComponent<ProgressProps> = ({
	startAt,
	duration,
}) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		let timer: ReturnType<typeof requestAnimationFrame>
		const loop = () => {
			const now = getTime()
			const elapsed = now - startAt
			const progress = Math.min(1, elapsed / duration)
			setProgress(progress)
			if (progress < 1) {
				timer = requestAnimationFrame(loop)
			}
		}
		loop()

		return () => {
			cancelAnimationFrame(timer)
		}
	})

	return (
		<div
			className={styles.wrapper}
			style={
				{
					'--progress': progress,
				} as CSSProperties
			}
		/>
	)
}
