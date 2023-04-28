import cors from 'cors'
import express from 'express'

const port = 5000

const app = express()

app.use(cors())

app.get('/', (request, response) => {
	response.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
