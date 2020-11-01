import * as React from 'react'
import { Player } from '../reducers/players'
import { useStateSelector } from '../useStateSelector'
import './players.css'

export interface PlayersProps {}

export const Players: React.FunctionComponent<PlayersProps> = ({}) => {
	const players = useStateSelector((state) =>
		state.players.players.filter((player) => !player.getIsSpectating()),
	)
	const localPlayerId = useStateSelector((state) => state.players.localPlayerId)
	return (
		<div className="players">
			{players.map((player) => (
				<PlayersItem
					key={player.id}
					player={player}
					isLocal={player.id === localPlayerId}
				/>
			))}
		</div>
	)
}

const PlayersItem: React.FunctionComponent<{
	player: Player
	isLocal: boolean
}> = ({ player }) => {
	return (
		<div
			className="players-item"
			style={{
				['--players-x' as any]: player.getXPosition().target,
			}}
		>
			<div className="players-item-in">
				<div className="players-image"></div>
				<div className="players-name">{player.getName()}</div>
			</div>
		</div>
	)
}
