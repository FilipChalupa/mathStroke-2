import { Badge } from '@mui/material'
import type { CSSProperties, FunctionComponent } from 'react'
import { Color, colorToHex } from 'utilities'
import styles from './PlayerName.module.css'

export interface PlayerNameProps {
	name: string
	color: Color
}

export const PlayerName: FunctionComponent<PlayerNameProps> = ({
	name,
	color,
}) => {
	return (
		<div className={styles.wrapper}>
			{name || <i>Unnamed player</i>}
			<Badge
				variant="dot"
				style={
					{
						'--color': colorToHex(color),
					} as CSSProperties
				}
				color="secondary"
				classes={{
					badge: styles.badge,
				}}
			>
				 
			</Badge>
		</div>
	)
}
