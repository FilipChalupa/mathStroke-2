import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../reducers'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Checkbox,
	Button,
} from '@material-ui/core'
import { useLocalPlayer } from '../useLocalPlayer'
import { playersSetLocalIsSpectating, playersSetLocalIsReady } from '../actions'

export const Lobby: React.SFC = () => {
	const dispatch = useDispatch()
	const players = useSelector((state: State) => state.players.players)
	const localPlayer = useLocalPlayer()
	const nonSpectatingPlayers = players.filter((player) => !player.isSpectating)
	const spectatorsCount = players.length - nonSpectatingPlayers.length

	const toggleIsReady = React.useCallback(() => {
		dispatch(playersSetLocalIsReady(!localPlayer.isReady))
	}, [localPlayer])

	return (
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
							<TableCell>@TODO</TableCell>
							<TableCell>
								<Checkbox
									checked={player.isReady}
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
									{localPlayer && localPlayer.isSpectating && (
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
							dispatch(playersSetLocalIsSpectating(!localPlayer.isSpectating))
						}}
					>
						{localPlayer.isSpectating ? 'Unspectate' : 'Spectate'}
					</Button>{' '}
					{!localPlayer.isSpectating && (
						<Button onClick={toggleIsReady}>
							{localPlayer.isReady ? 'Unready' : 'Ready'}
						</Button>
					)}
				</>
			)}
		</Paper>
	)
}
