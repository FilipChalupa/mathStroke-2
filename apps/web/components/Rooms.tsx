import InboxIcon from '@mui/icons-material/Inbox'
import {
	Button,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { useLocalLoading } from 'shared-loading-indicator'

export interface RoomsProps {
	rooms: Array<{
		id: string
		name: string
	}>
	onRequestNewRoom: () => Promise<void>
}

export const Rooms: FunctionComponent<RoomsProps> = ({
	onRequestNewRoom,
	rooms,
}) => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<Container>
			<List>
				{rooms.map((room) => (
					<ListItem disablePadding key={room.id}>
						<ListItemButton>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={room.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
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
		</Container>
	)
}
