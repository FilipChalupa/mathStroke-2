import express from 'express'
import http from 'http'
import url from 'url'
import WebSocket from 'ws'
import { GamesManager } from './GamesManager.js'

const app = express()
const port = parseInt(process.env.PORT || '', 10) || 8080

const gamesManager = new GamesManager()

app.use(express.json())

app.use(express.static('dist/public'))

app.get('/public-games.json', (request, response) =>
	response.send({
		games: gamesManager.getPublicGames().map((game) => ({
			id: game.id,
			name: game.name,
		})),
	}),
)

const genericWsServer = new WebSocket.Server({ noServer: true })
genericWsServer.on('connection', (ws: WebSocket) => {
	console.log('New connection')
	ws.send('Hello from server')
	ws.on('message', (message) => {
		console.log('New message', message)
	})
})

app.post('/create-game.json', (request, response) => {
	// @TODO: reuse api parser from client
	const data = request.body

	const game = gamesManager.createGame(data.gameName, data.isPublic)

	response.send({
		gameId: game.id,
	})
})

const server = http.createServer(app)

server.on('upgrade', (request, socket, head) => {
	const { pathname } = url.parse(request.url)

	const match = pathname?.match(/\/game\/(.*)\.ws/)
	const gameId = match ? match[1] : null

	if (gameId && gamesManager.getGameById(gameId)) {
		genericWsServer.handleUpgrade(request, socket, head, (ws) => {
			genericWsServer.emit('connection', ws, request)
		})
	} else {
		socket.destroy()
	}
})

server.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
