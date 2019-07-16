import request from 'request-promise-native'
import cheerio from 'cheerio'

import ZONES from './static/zones.json'

const BASE_STATIONS_URL =
	'http://horarios.renfe.com/cer/hjcer300.jsp?CP=NO&I=s&NUCLEO='
const BASE_TRIP_URL = 'http://horarios.renfe.com/cer/hjcer310.jsp?'

const zoneStationURL = id => `${BASE_STATIONS_URL}${id}`

// Scraping
const fetchPage = (url, callback) => {
	request(url, (error, response, body) => {
		if (error) {
			console.log(`Error requesting page: ${error}`)
			return
		}

		callback(body)
	})
}

const scrapStations = body => {
	const $ = cheerio.load(body)

	const options = $('select[name=o]').find('option')

	return options
		.map((i, element) => {
			let option = $(element),
				id = option.attr('value'),
				name = option.text().trim()

			return id === '?' ? null : { id, name }
		})
		.filter(element => element != null)
		.get()
}

// Get stations list
const getStations = async zone => {
	const URL = zoneStationURL(zone.id)
	const body = await request(URL)
	const stations = scrapStations(body)
	return stations
}

const getAllStations = async () =>
	await Promise.all(
		ZONES.map(async zone => {
			return {
				zone: zone,
				stations: await getStations(zone),
			}
		})
	)

getAllStations().then(data => {
	const json = JSON.stringify(data)
	console.log(json)
})

// Get trips
