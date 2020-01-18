import ZONES from './static/zones.json'
import STATIONS from './static/stations.json'

import getAllStations from './src/scrap.stations.mjs'

import { getAllTrips, getDateTrips, getZoneDateTrips, getTrips } from './src/scrap.trips.mjs'

const scrap = {
	ZONES,
	STATIONS,
	getAllStations,
	getAllTrips,
	getDateTrips,
	getZoneDateTrips,
	getTrips
}

export { ZONES, STATIONS, getAllStations, getAllTrips, getDateTrips, getZoneDateTrips, getTrips }
export default scrap
