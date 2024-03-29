import VisibilityIcon from '@mui/icons-material/Visibility'
import {
	Button,
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { useLocalLoading } from 'shared-loading-indicator'
import { playHref, watchHref } from '../../server/src/utilities/href'

export interface RoomsProps {
	rooms: Array<{
		id: string
		name: string
		playerCount: number
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
		<Container maxWidth="sm">
			<Typography variant="h5" component="h2">
				Choose a room
			</Typography>
			<List>
				{rooms.map((room) => (
					<ListItem
						disablePadding
						key={room.id}
						secondaryAction={
							<Tooltip title="Spectate">
								<IconButton
									aria-label="spectate"
									LinkComponent={Link}
									href={watchHref(room.id)}
								>
									<VisibilityIcon />
								</IconButton>
							</Tooltip>
						}
					>
						<ListItemButton LinkComponent={Link} href={playHref(room.id)}>
							<ListItemText
								primary={room.name || <i>Unnamed room</i>}
								secondary={`Players: ${room.playerCount}`}
							/>
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
