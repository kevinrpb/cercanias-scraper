import path from 'path'
import express from 'express'

import DBManager from './src/db.mjs'
import zones from './routes/zones.mjs'

const __dirname = path.dirname((new URL(import.meta.url)).pathname);
const __dbdir = path.join(__dirname, 'cercanias.sqlite')

const app = express()
const db = new DBManager(__dbdir)

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})

app.use((req, res, next) => {
	res.db = db
	next()
})

app.use('/zones', zones)
// app.get('/zone/:zone/stations', cercanias.stations)
// app.get('/zone/:zone/trip/from/:origin/to/:destination', cercanias.trips)

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
