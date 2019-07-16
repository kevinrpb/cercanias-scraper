import express from 'express'
import cercanias from './controllers/cercanias.mjs'

const app = express()

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})

app.get('/zones', cercanias.zones)
app.get('/zone/:zone/stations', cercanias.stations)
app.get('/zone/:zone/trip/from/:origin/to/:destination', cercanias.trips)

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
