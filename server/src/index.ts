import express from 'express'
console.log('Test')
console.log(express)

// import express from 'express'
// import http from 'http'
// import url from 'url'
// import { GamesManager } from './GamesManager'

// const app = express()
// const port = parseInt(process.env.PORT || '', 10) || 8080

// const gamesManager = new GamesManager()

// gamesManager.createGame('Initial room', true, false, 'initial')

// for (let i = 1; i <= 9; i++) {
// 	gamesManager.createGame(`Test room ${i}`, true, false, `test-${i}`)
// }

// app.use(express.json())

// app.use(express.static('dist/public'))

// app.get('/public-games.json', (request, response) =>
// 	response.send({
// 		games: gamesManager
// 			.getPublicGames()
// 			.map((game) => ({
// 				id: game.id,
// 				name: game.name,
// 				playersCount: game.getPlayersCount(),
// 			}))
// 			.sort((a, b) => b.playersCount - a.playersCount),
// 	}),
// )

// app.post('/create-game.json', (request, response) => {
// 	// @TODO: reuse api parser from client
// 	const data = request.body

// 	const game = gamesManager.createGame(data.gameName, data.isPublic, true)

// 	response.send({
// 		gameId: game.id,
// 	})
// })

// const server = http.createServer(app)

// server.on('upgrade', (request, socket, head) => {
// 	const { pathname } = url.parse(request.url)

// 	const match = pathname?.match(/\/game\/(.*)\.ws/)
// 	const gameId = match ? match[1] : null
// 	const game = gameId ? gamesManager.getGameById(gameId) : undefined

// 	if (game) {
// 		game.handleIncomingConnection(request, socket, head)
// 	} else {
// 		socket.destroy()
// 	}
// })

// server.listen(port, () => {
// 	console.log(`Server started on port ${port}`)
// })
