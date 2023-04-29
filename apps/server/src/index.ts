import cors from 'cors'
import express from 'express'
import http from 'http'
import { createRooms } from './room/rooms'
import { createRoomsServer } from './roomsServer'

const port = 5000

const app = express()
const server = http.createServer(app)

app.use(cors())

app.get('/', (request, response) => {
	response.send('Hello World!')
})

const rooms = createRooms()
const roomsServer = createRoomsServer(rooms)

server.on('upgrade', (request, socket, head) => {
	const pathname = request.url
	if (pathname === '/rooms') {
		roomsServer.handleUpgrade(request, socket, head)
	} else {
		socket.destroy()
	}
})

server.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
