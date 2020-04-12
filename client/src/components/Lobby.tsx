import * as React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../reducers'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Checkbox,
} from '@material-ui/core'

export const Lobby: React.SFC = () => {
	const players = useSelector((state: State) => state.players.players)
	const nonSpectatingPlayers = players.filter((player) => !player.isSpectating)
	const spectatorsCount = players.length - nonSpectatingPlayers.length

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
								<Checkbox checked={player.isReady} disabled />
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
								</i>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Paper>
	)
}
