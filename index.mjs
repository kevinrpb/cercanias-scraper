import path from 'path'
import fs from 'fs'

const __dirname = path.dirname((new URL(import.meta.url)).pathname)

import zones from './static/zones.json'
import scrapStations from './src/scrap.stations.mjs'
import scrapTrips from './src/scrap.trips.mjs'

const getZones = () => {
	let zoneList = []

	for (let zone of zones) {
		const zoneID = zone
		const zoneName = zone

		zoneList.push({ zoneID, zoneName })
	}

	return zoneList
}

const getStations = async () => {
	let data = await scrapStations.getAllStations()

	let stationList = []

	for (let zoneSet of data) {
		const zoneID = zoneSet.zone.id

		for (let station of zoneSet.stations) {
			const stationID = station.id
			const stationName = station.name

			stationList.push({ zoneID, stationID, stationName })
		}
	}

	return stationList
}

const getTrips = async (date) => {
	let data = await scrapTrips.getAllTrips(date)

	let tripList = []

	for (let tripSet of data) {
		database.tripList.push(tripSet)
	}

	return tripList
}

const scrap = async () => {

	let database = {
		zoneList: getZones(),
		stationList: await getStations(),
		tripList: []
	}

	// 4. Get trips


	// 5. Save DB

	return database
}


export default scrap;
