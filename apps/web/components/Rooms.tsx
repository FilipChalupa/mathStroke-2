import InboxIcon from '@mui/icons-material/Inbox'
import {
	Button,
	Container,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
} from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { useLocalLoading } from 'shared-loading-indicator'

export interface RoomsProps {
	rooms: Array<{
		id: string
		name: string
	}>
	onRequestNewRoom: (name: string) => Promise<void>
}

export const Rooms: FunctionComponent<RoomsProps> = ({
	onRequestNewRoom,
	rooms,
}) => {
	const [isLoading, setIsLoading] = useLocalLoading()
	const [newRoomName, setNewRoomName] = useState('')

	return (
		<Container>
			<List>
				{rooms.map((room) => (
					<ListItem disablePadding key={room.id}>
						<ListItemButton>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={room.name || <i>Unnamed room</i>} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<form
				onSubmit={async (event) => {
					event.preventDefault()
					setIsLoading(true)
					await onRequestNewRoom(newRoomName) // @TODO: redirect to new room
					setNewRoomName('')
					setIsLoading(false)
				}}
			>
				<Grid container gap={1}>
					<Grid item flexGrow={1}>
						<TextField
							size="small"
							label="Room name"
							variant="outlined"
							value={newRoomName}
							disabled={isLoading}
							fullWidth
							onChange={(event) => {
								setNewRoomName(event.target.value)
							}}
						/>
					</Grid>
					<Grid item>
						<Button variant="contained" type="submit" disabled={isLoading}>
							Create
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}
