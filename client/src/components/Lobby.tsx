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
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { playersSetLocalIsReady, playersSetLocalIsSpectating } from '../actions'
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
							<TableCell>#</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Ready</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{nonSpectatingPlayers.map((player, i) => (
							<TableRow key={player.id}>
								<TableCell>{i + 1}.</TableCell>
								<TableCell>{player.getName()}</TableCell>
								<TableCell>
									<Checkbox
										checked={player.getIsReady()}
										disabled={!localPlayer || player.id !== localPlayer.id}
										onClick={
											localPlayer && player.id === localPlayer.id
												? toggleIsReady
												: undefined
										}
									/>
									{/* @TODO: current user make clickable */}
								</TableCell>
							</TableRow>
						))}
						{spectatorsCount > 0 && (
							<TableRow>
								<TableCell>👁️</TableCell>
								<TableCell colSpan={2}>
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
						<Button
							onClick={() => {
								dispatch(
									playersSetLocalIsSpectating(!localPlayer.getIsSpectating()),
								)
							}}
						>
							{localPlayer.getIsSpectating() ? 'Unspectate' : 'Spectate'}
						</Button>{' '}
						{!localPlayer.getIsSpectating() && (
							<Button onClick={toggleIsReady}>
								{localPlayer.getIsReady() ? 'Unready' : 'Ready'}
							</Button>
						)}
					</>
				)}
			</Paper>
		</>
	)
}
