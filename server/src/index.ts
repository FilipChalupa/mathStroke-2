import express from 'express'

const app = express()
const port = parseInt(process.env.PORT || '', 10) || 8080

app.use(express.static('dist/public'))

app.get('/public-games.json', (req, res) =>
	res.send({
		games: [
			{
				name: 'Game 1',
				id: 'g-1',
			},
			{
				name: 'Game 2',
				id: 'g-2',
			},
			{
				name: 'Game 3',
				id: 'g-3',
			},
		],
	}),
)

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
