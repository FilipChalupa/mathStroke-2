import express from 'express'
import http from 'http'
import url from 'url'
import WebSocket from 'ws'

const app = express()
const port = parseInt(process.env.PORT || '', 10) || 8080

const games: {
	id: string
	name: string
	isPublic: string
}[] = []

app.use(express.json())

app.use(express.static('dist/public'))

app.get('/public-games.json', (request, response) =>
	response.send({
		games: games
			.filter((game) => game.isPublic)
			.map((game) => ({
				id: game.id,
				name: game.name,
			})),
	}),
)

const genericWsServer = new WebSocket.Server({ noServer: true })
genericWsServer.on('connection', (ws: WebSocket) => {
	console.log('New connection')
	ws.on('message', (message) => {
		console.log('New message', message)
		ws.send('Hello from server')
	})
})

function gameExists(gameId: string) {
	return games.some((game) => game.id === gameId)
}

app.post('/create-game.json', (request, response) => {
	const data = request.body
	const gameId = `game-${Math.round(Math.random() * 9999 + 1000)}`

	// @TODO: reuse api parser from client
	games.push({
		id: gameId,
		name: data.gameName,
		isPublic: data.isPublic,
	})
	response.send({
		gameId,
	})
})

const server = http.createServer(app)

server.on('upgrade', (request, socket, head) => {
	const { pathname } = url.parse(request.url)

	const match = pathname?.match(/\/game\/(.*)\.ws/)
	const gameId = match ? match[1] : null

	if (gameId && gameExists(gameId)) {
		genericWsServer.handleUpgrade(request, socket, head, (ws) => {
			ws.emit('connection', ws, request)
		})
	} else {
		socket.destroy()
	}
})

server.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
