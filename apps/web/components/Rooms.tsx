import Button from '@mui/material/Button'
import type { FunctionComponent } from 'react'
import { useLocalLoading } from 'shared-loading-indicator'

export interface RoomsProps {
	onRequestNewRoom: () => Promise<void>
}

export const Rooms: FunctionComponent<RoomsProps> = ({ onRequestNewRoom }) => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<>
			Rooms
			<Button
				variant="contained"
				disabled={isLoading}
				onClick={async () => {
					setIsLoading(true)
					await onRequestNewRoom() // @TODO: redirect to new room
					setIsLoading(false)
				}}
			>
				New room
			</Button>
		</>
	)
}
