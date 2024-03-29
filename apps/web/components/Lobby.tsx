import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
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
import { green } from '@mui/material/colors'
import { FunctionComponent, useMemo } from 'react'
import { RoomState } from '../../../packages/messages/utilities/RoomState'
import { Player } from '../utilities/usePlayState'
import { WatchState } from '../utilities/useWatchState'
import { PlayerName } from './PlayerName'

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
	const highestHitCount = useMemo(
		() =>
			players.reduce(
				(maximum, otherPlayer) => Math.max(maximum, otherPlayer.hitCount),
				0,
			),
		[players],
	)

	return (
		<Container maxWidth="sm">
			{/* @TODO: remove <br /> */}
			<br />
			<br />
			<Typography variant="h5" component="h2" gutterBottom>
				Level {watchState.levelNumber}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">
								<Tooltip title="Hits">
									<DoneIcon />
								</Tooltip>
							</TableCell>
							<TableCell align="center">
								<Tooltip title="Jammed">
									<CloseIcon />
								</Tooltip>
							</TableCell>
							<TableCell align="right">Ready</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{players.map((otherPlayer) => (
							<TableRow key={otherPlayer.id}>
								<TableCell component="th" scope="row">
									<PlayerName
										name={otherPlayer.name}
										color={otherPlayer.color}
									/>
								</TableCell>
								<TableCell align="center" color="success">
									<Typography
										color={
											highestHitCount !== 0 &&
											otherPlayer.hitCount === highestHitCount
												? green[500]
												: undefined
										}
									>
										{otherPlayer.hitCount}
									</Typography>
								</TableCell>
								<TableCell align="center">{otherPlayer.jammedCount}</TableCell>
								<TableCell align="center" padding="checkbox">
									{player?.state.id === otherPlayer.id ? (
										<Tooltip
											title={
												otherPlayer.ready
													? 'Set you are not ready'
													: 'Set you are ready'
											}
										>
											<Checkbox
												checked={otherPlayer.ready}
												autoFocus
												onChange={(event) => {
													player.action.changeReady(event.target.checked)
												}}
												onKeyDown={(event) => {
													if (event.code === 'Enter') {
														event.preventDefault()
														player.action.changeReady(!otherPlayer.ready)
													}
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
								<TableCell colSpan={5}>
									<i>Spectators count: {watchersCount}</i>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{/* @TODO: remove <br /> */}
			<br />
			<br />
		</Container>
	)
}
