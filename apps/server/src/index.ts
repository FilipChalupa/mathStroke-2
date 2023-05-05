import cors from 'cors'
import express from 'express'
import http from 'http'
import { createRooms } from './room/rooms'
import { createRoomsServer } from './roomsServer'

const port = Number(process.env.PORT) || 5000

const app = express()
const server = http.createServer(app)

app.use(cors())

app.get('/', (request, response) => {
	response.send('Hello World!')
})

// Endpoint to check if the server is running
app.get('/health', (request, response) => {
	response.send('ok')
})

const rooms = createRooms()
const roomsServer = createRoomsServer(rooms)

server.on('upgrade', (request, socket, head) => {
	const pathname = request.url ?? ''
	if (pathname === '/rooms') {
		roomsServer.handleUpgrade(request, socket, head)
	} else {
		const pattern = /^\/(play|watch)\/(.*)$/
		const match = pathname.match(pattern)
		if (match !== null) {
			const [_, mode, roomId] = match
			const room = rooms.findById(roomId)
			if (room !== null) {
				if (mode === 'play') {
					room.handleUpgrade.play(request, socket, head)
				} else if (mode === 'watch') {
					room.handleUpgrade.watch(request, socket, head)
				} else {
					throw new Error(`Unexpected mode: ${mode}`)
				}
				return
			}
		}
		socket.destroy()
	}
})

server.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
