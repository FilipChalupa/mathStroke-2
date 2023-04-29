import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { Rooms } from '../components/Rooms'
import { requestNewRoom } from '../utilities/messages/rooms'

export default function Web() {
	const [webSocket, setWebsocket] = useState<WebSocket | null>(null)

	useEffect(() => {
		const webSocket = new WebSocket('ws://localhost:5000/rooms')
		webSocket.addEventListener('open', () => {
			console.log('open')
			webSocket.send('Hello Server!')
			setWebsocket(webSocket)
		})

		return () => {
			webSocket.close()
			setWebsocket(null)
		}
	}, [])

	useMirrorLoading(webSocket === null)

	return (
		<div>
			<h1>Web</h1>
			{webSocket && <In webSocket={webSocket} />}
		</div>
	)
}

const In: FunctionComponent<{ webSocket: WebSocket }> = ({ webSocket }) => {
	const [rooms, setRooms] = useState<unknown[]>([])

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			console.log('Message received', event)
		}
		webSocket.addEventListener('message', handleMessage)

		return () => {
			webSocket.removeEventListener('message', handleMessage)
		}
	}, [webSocket])

	const handleRequestNewRoom = useCallback(async () => {
		console.log('request new room')
		requestNewRoom(webSocket)
		await new Promise((resolve) => setTimeout(resolve, 1000)) // @TODO: await new room information
	}, [webSocket])

	return <Rooms onRequestNewRoom={handleRequestNewRoom} />
}
