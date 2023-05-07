import {
	Checkbox,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { RoomState } from '../../../packages/messages/utilities/RoomState'
import { Player } from '../utilities/usePlayState'
import { WatchState } from '../utilities/useWatchState'

export interface LobbyProps {
	players: WatchState['players']
	watchersCount: WatchState['watchersCount']
	watchState: Extract<RoomState, { state: 'lobby' }>
	player?: Player
}

export const Lobby: FunctionComponent<LobbyProps> = ({
	players,
	watchersCount,
	watchState,
	player,
}) => {
	return (
		<Container maxWidth="sm">
			<Typography variant="h5" component="h2" gutterBottom>
				Level {watchState.levelNumber}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Color</TableCell>
							<TableCell align="right">Ready</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{players.map((otherPlayer) => (
							<TableRow key={otherPlayer.id}>
								<TableCell component="th" scope="row">
									{otherPlayer.name || <i>Unnamed player</i>}
								</TableCell>
								<TableCell align="right">{otherPlayer.color}</TableCell>
								<TableCell align="right">
									{player?.state.id === otherPlayer.id ? (
										<Tooltip
											title={
												otherPlayer.ready
													? 'You are ready'
													: 'You are not ready'
											}
										>
											<Checkbox
												checked={otherPlayer.ready}
												onChange={(event) => {
													player.action.changeReady(event.target.checked)
												}}
											/>
										</Tooltip>
									) : (
										<Checkbox checked={otherPlayer.ready} disabled />
									)}
								</TableCell>
							</TableRow>
						))}
						{watchersCount > 0 && (
							<TableRow>
								<TableCell colSpan={3}>
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
