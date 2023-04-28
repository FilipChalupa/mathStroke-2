import { useEffect } from 'react'
import { Button } from 'ui'

export default function Web() {
	useEffect(() => {
		const webSocket = new WebSocket('ws://localhost:5000/rooms')
		webSocket.addEventListener('open', () => {
			console.log('open')
			webSocket.send('Hello Server!')
		})
	}, [])

	return (
		<div>
			<h1>Web</h1>
			<Button />
		</div>
	)
}
