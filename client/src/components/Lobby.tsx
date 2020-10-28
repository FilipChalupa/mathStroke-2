import {
	Button,
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import VisibilityIcon from '@material-ui/icons/Visibility'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { playersSetLocalIsReady, playersSetLocalIsSpectating } from '../actions'
import { routes } from '../routes'
import { useLocalPlayer } from '../useLocalPlayer'
import { useStateSelector } from '../useStateSelector'
import { LobbyCountdown } from './LobbyCountdown'

export const Lobby: React.SFC = () => {
	const dispatch = useDispatch()
	const players = useStateSelector((state) => state.players.players)
	const localPlayer = useLocalPlayer()
	const nonSpectatingPlayers = players.filter(
		(player) => !player.getIsSpectating(),
	)
	const spectatorsCount = players.length - nonSpectatingPlayers.length

	const toggleIsReady = React.useCallback(() => {
		dispatch(playersSetLocalIsReady(!localPlayer.getIsReady()))
	}, [localPlayer])

	return (
		<>
			<LobbyCountdown />
			<Paper>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>#</TableCell>
							<TableCell>Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{nonSpectatingPlayers.map((player, i) => (
							<TableRow key={player.id}>
								<TableCell padding="checkbox">
									<Checkbox
										checked={player.getIsReady()}
										disabled={!localPlayer || player.id !== localPlayer.id}
										onClick={
											localPlayer && player.id === localPlayer.id
												? toggleIsReady
												: undefined
										}
									/>
								</TableCell>
								<TableCell>{i + 1}.</TableCell>
								<TableCell>{player.getName()}</TableCell>
							</TableRow>
						))}
						{spectatorsCount > 0 && (
							<TableRow>
								<TableCell colSpan={2}>
									<VisibilityIcon />
								</TableCell>
								<TableCell>
									<i>
										{spectatorsCount}{' '}
										{spectatorsCount === 1 ? 'spectator' : 'spectators'}
										{localPlayer && localPlayer.getIsSpectating() && (
											<> including you</>
										)}
									</i>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				{localPlayer && (
					<>
						{!localPlayer.getIsSpectating() && (
							<Button startIcon={<PlayArrowIcon />} onClick={toggleIsReady}>
								{localPlayer.getIsReady() ? 'Unready' : 'Ready'}
							</Button>
						)}{' '}
						<Button
							startIcon={<VisibilityIcon />}
							onClick={() => {
								dispatch(
									playersSetLocalIsSpectating(!localPlayer.getIsSpectating()),
								)
							}}
						>
							{localPlayer.getIsSpectating() ? 'Unspectate' : 'Spectate'}
						</Button>
					</>
				)}{' '}
				<Button
					startIcon={<ExitToAppIcon />}
					component={Link}
					to={routes.homepage}
					onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
						if (
							localPlayer &&
							!localPlayer.getIsSpectating() &&
							!confirm('Do you really want to leave?')
						) {
							event.preventDefault()
						}
					}}
				>
					Leave
				</Button>
			</Paper>
		</>
	)
}
