export function getGameSocket(gameId: string) {
	return new WebSocket(
		`${location.protocol.replace('http', 'ws')}//${
			location.host
		}/game/${gameId}.ws`,
	)
}
