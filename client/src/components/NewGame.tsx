import * as React from 'react'
import {
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
} from '@material-ui/core'
import { routes } from '../routes'
import { Link, useHistory } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { createGame } from '../createGame'
import { createGameUrl } from '../createGameUrl'

export const NewGame: React.SFC = () => {
	useUpdateTitleOnMount('New game')

	const [isLoading, setIsLoading] = React.useState(false)
	const [isPublic, setIsPublic] = React.useState(true)
	const [gameName, setGameName] = React.useState(
		`Room ${Math.round(Math.random() * 9999 + 1000)}`,
	)
	const history = useHistory()

	const onSubmit = React.useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			setIsLoading(true)
			const gameData = await createGame(gameName, isPublic)
			if (gameData.gameId) {
				history.push(createGameUrl(gameData.gameId))
			} else {
				alert('Game creation failed')
				setIsLoading(false)
			}
		},
		[gameName, isPublic],
	)

	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>New game</Link>
				{isLoading && <div>Loading</div>}
				<form onSubmit={onSubmit}>
					<div>
						<TextField
							label="Game name"
							value={gameName}
							fullWidth
							onChange={(event) => setGameName(event.target.value)}
							autoFocus
						/>
					</div>
					<div>
						<FormControlLabel
							control={
								<Checkbox
									checked={isPublic}
									onChange={(event) => setIsPublic(event.target.checked)}
									color="primary"
								/>
							}
							label="Anyone can join"
						/>
					</div>
					<div>
						<Button variant="contained" color="primary" type="submit">
							Create
						</Button>
					</div>
				</form>
			</Typography>
		</>
	)
}
