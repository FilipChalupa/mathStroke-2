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

export interface LobbyProps {
	players: WatchState['players']
	watchersCount: WatchState['watchersCount']
}

export const Lobby: FunctionComponent<LobbyProps> = ({
	players,
	watchersCount,
}) => {
	return (
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
						{players.map((player) => (
							<TableRow key={player.id}>
								<TableCell component="th" scope="row">
									{player.name || <i>Unnamed player</i>}
								</TableCell>
								<TableCell align="right">{player.color}</TableCell>
							</TableRow>
						))}
						{watchersCount > 0 && (
							<TableRow>
								<TableCell colSpan={2}>
									<i>Spectators count: {watchersCount}</i>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}
