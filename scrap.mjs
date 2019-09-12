import path from 'path'
import fs from 'fs'
import sqlite from 'sqlite3'

const __dirname = path.dirname((new URL(import.meta.url)).pathname);
const __dbdir = path.join(__dirname, 'cercanias.sqlite')

const db = new sqlite.Database(__dbdir)

// 1. Setup DB
db.run(`
CREATE TABLE IF NOT EXISTS cercanias_zones (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	map TEXT NOT NULL
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS cercanias_stations (
	id INTEGER PRIMARY KEY,
	zone_id INTEGER NOT NULL,
	name TEXT NOT NULL,
	FOREIGN KEY (zone_id)
		REFERENCES cercanias_zones (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS cercanias_trip (
	origin INTEGER NOT NULL,
	destination INTEGER NOT NULL,
	date TEXT NOT NULL,
	sections TEXT NOT NULL,
	times TEXT NOT NULL,
	durations TEXT NOT NULL,
	PRIMARY KEY (origin, destination, date),
	FOREIGN KEY (origin)
		REFERENCES cercanias_stations (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	FOREIGN KEY (destination)
		REFERENCES cercanias_stations (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
)
`)
/*
 * sections is an array containing objects like:
 * {
 *   origin: <name>,
 *   destination: <name>,
 *   line: <name>
 * }
 * for each of the needed transfers. Minimum length will then be one
 * (no transfers at all)
 *
 * times is an array of each of the trip's times with objects
 * {
 *   origin: <time>,
 *   destination: <time>
 * }
 *
 * durations is an array containing the durations of each trip
 *
 * sections, times, and durations must match in length!
*/

// 2. Insert or Replace zones

import zones from './static/zones.json'

for (let zone of zones) {

}

// 3. Insert or Replace stations

import scrapStations from './src/scrap.stations.mjs'

scrapStations.getAllStations().then(data => {
	let stations = []

	for (let zoneSet of data) {
		const zoneID = zoneSet.zone.id

		for (let station of zoneSet.stations) {
			const stationID = station.id
			const stationName = station.name

			stations.push({ zoneID, stationID, stationName })
		}
	}

	return stations
})
.then(stations => {
	console.log(stations)
})
.catch(error => {
	console.error(error)
})

// 4.
