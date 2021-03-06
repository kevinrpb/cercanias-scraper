import request from 'request-promise-native'
import cheerio from 'cheerio'
import iconv from 'iconv'

import STATIONS from '../static/stations.json'

const BASE_TRIP_URL = 'http://horarios.renfe.com/cer/hjcer310.jsp?I=i'

const scrapHeader = thead => {
	// TODO: Scrap header info to get transfers

	return {

	}
}

const scrapTrip = (header, row) => {
	// TODO: Scrap row body info to get times and transfers that apply

	return {

	}
}

const scrapTrips = body => {
	const $ = cheerio.load(body)

	const table = $('table')
	const thead = table.children('thead')
	const tbody = table.children('tbody')

	const header = scrapHeader(thead)
	const rows = tbody.children('tr')

	const trips = rows.map(row => scrapTrip(header, row))

	return trips
}

const getTrips = async ({ zone, origin, destination }, date) => {
	const body = await request({
		method: 'POST',
		url: BASE_TRIP_URL,
		encoding: null,
		form: {
			'nucleo': zone,
			'i':      'i',
			'cp':     'NO',
			'o':       origin,
			'd':       destination,
			'df':      date,
			'ho':      '00',
			'hd':      '26',
			'TXTInfo': ''
		}
	})

	const ic = new iconv.Iconv('iso-8859-1', 'utf-8')
	const buf = ic.convert(body)
	const utf8Body = buf.toString('utf-8')

	return scrapTrips(utf8Body)
}

const getZoneDateTrips = async (zoneID, date) => {
	let combinations = []

	for (let station1 of STATIONS) {
		for (let station2 of STATIONS) {
			if (station1.zoneID === station2.zoneID &&
				station1.zoneID === zoneID &&
				station1.stationID !== station2.zoneID
			) {
				combinations.push({
					'zone': zoneID,
					'origin': station1.stationID,
					'destination': station2.stationID
				})
			}
		}
	}

	return await Promise.all(
		combinations.map(async combination => {
			return {
				...combination,
				'trips': await getTrips(combination, date)
			}
		})
	)
}

const getDateTrips = async (date) => {
	return await Promise.all(
		ZONES.map(async zone => getZoneDateTrips(zone, date))
	)
}

const getAllTrips = async () => {
	// TODO:
}


export { getAllTrips, getDateTrips, getZoneDateTrips, getTrips }
