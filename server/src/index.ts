import express from 'express'

const app = express()
const port = parseInt(process.env.PORT || '', 10) || 8080

app.use(express.static('dist/public'))

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
