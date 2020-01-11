import request from 'request-promise-native'
import cheerio from 'cheerio'
import iconv from 'iconv'

import STATIONS from '../static/stations.json'

const BASE_TRIP_URL = 'http://horarios.renfe.com/cer/hjcer310.jsp'

const scrapTrips = body => {
	const $ = cheerio.load(body)

	console.log($)

	//TODO: scrap
	return []
}

const getTrips = async (zone, origin, destination, date) => {
	const body = await request({
		method: 'POST',
		url: BASE_TRIP_URL,
		encoding: null,
		form: {
			'nucleo': zone,
			'i': 'i',
			'cp': 'NO',
			'o': origin,
			'd': destination,
			'df': date
		}
	})

	const ic = new iconv.Iconv('iso-8859-1', 'utf-8')
	const buf = ic.convert(body)
	const utf8Body = buf.toString('utf-8')

	const trips = scrapTrips(utf8Body)
	return trips
}

const getAllTrips = async (date) => {
	return await Promise.all(
		STATIONS.flatMap(async (zoneID1, stationID1, stationName1) => {
			await STATIONS.map(async (zoneID2, stationID2, stationName2) => {
				if (zoneID1 === zoneID2 && stationID1 !== stationID2) {
					return {
						zone: zoneID1,
						origin: stationID1,
						destination: stationID2,
						trips: await getTrips(zoneID1, stationID1, stationID2, date)
					}
				} else {
					return null
				}
			})
		})
	)
}

export default { getAllTrips }
