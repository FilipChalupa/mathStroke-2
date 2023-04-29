export namespace ClientRooms {
	export type RequestNewRoom = {
		type: 'request-new-room'
	}

	export type AnyClientMessage = RequestNewRoom
}

// export const createConnection = (
// 	handleMessage: (data: AnyServerMessage) => void,
// ) => {
// 	const webSocket = new WebSocket('ws://localhost:5000/rooms')
// 	webSocket.addEventListener('open', () => {
// 		console.log('open')
// 		webSocket.send('Hello Server!')
// 	})

// 	webSocket.addEventListener('message', (event: MessageEvent<string>) => {
// 		const data = JSON.parse(event.data) as AnyServerMessage

// 		handleMessage(data)

// 		// if (data.type === 'add-room-announcement') {
// 		// 	console.log('handle add-room-announcement')
// 		// } else if (data.type === 'remove-room-announcement') {
// 		// 	console.log('handle remove-room-announcement')
// 		// } else {
// 		// 	assertNever(data)
// 		// }
// 	})

// 	const send = (message: AnyClientMessage) => {
// 		webSocket.send(JSON.stringify(message))
// 	}

// 	const close = () => {
// 		webSocket.close()
// 	}

// 	return { close, send }
// }
