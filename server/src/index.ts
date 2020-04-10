import express from 'express'

const app = express()
const port = 8080

app.use(express.static('dist/public'))

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
