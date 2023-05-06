import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { WatchState } from '../utilities/useWatchState'

export interface RoomProps {
	watchState: WatchState
}

export const Room: FunctionComponent<RoomProps> = ({ watchState }) => {
	return (
		<>
			<pre>State: {JSON.stringify(watchState.roomState)}</pre>
			<Container maxWidth="sm">
				<TableContainer component={Paper}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="right">Color</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{watchState.players.map((player) => (
								<TableRow key={player.id}>
									<TableCell component="th" scope="row">
										{player.name || <i>Unnamed player</i>}
									</TableCell>
									<TableCell align="right">{player.color}</TableCell>
								</TableRow>
							))}
							{watchState.watchersCount > 0 && (
								<TableRow>
									<TableCell colSpan={2}>
										<i>Spectators count: {watchState.watchersCount}</i>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}
