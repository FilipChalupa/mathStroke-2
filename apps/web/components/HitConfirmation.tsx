import { useTheme } from '@mui/material'
import clsx from 'clsx'
import { CSSProperties, FunctionComponent, useRef } from 'react'
import styles from './HitConfirmation.module.css'

export interface HitConfirmationProps {
	lastHitConfirmationTime: number
	jammed: boolean
}

export const HitConfirmation: FunctionComponent<HitConfirmationProps> = ({
	lastHitConfirmationTime,
	jammed,
}) => {
	const initialValue = useRef(lastHitConfirmationTime)
	const theme = useTheme()

	return (
		<div className={styles.wrapper}>
			<div
				className={clsx(styles.jammed, jammed && styles.is_jammed)}
				style={
					{
						'--color': theme.palette.error.main,
					} as CSSProperties
				}
			/>
			{initialValue.current !== lastHitConfirmationTime && (
				<div
					className={styles.hit}
					key={lastHitConfirmationTime}
					style={
						{
							'--color': theme.palette.success.main,
						} as CSSProperties
					}
				/>
			)}
		</div>
	)
}
