import request from 'request-promise-native';
import cheerio from 'cheerio';
import iconv from 'iconv';

import ZONES from '../static/zones.json';

import fs from 'fs';

const BASE_STATIONS_URL =
	'http://horarios.renfe.com/cer/hjcer300.jsp?CP=NO&I=s&NUCLEO=';
const BASE_TRIP_URL = 'http://horarios.renfe.com/cer/hjcer310.jsp?';

const zoneStationURL = id => `${BASE_STATIONS_URL}${id}`;

const scrapStations = body => {
	const $ = cheerio.load(body);

	const options = $('select[name=o]').find('option');

	return options
		.map((i, element) => {
			let option = $(element),
				id = option.attr('value'),
				name = option.text().trim();

			return id === '?' ? null : { id, name };
		})
		.filter(element => element != null)
		.get();
};

const getStations = async zone => {
	const body = await request({
		url: zoneStationURL(zone.id),
		encoding: null,
	});

	const ic = new iconv.Iconv('iso-8859-1', 'utf-8');
	const buf = ic.convert(body);
	const utf8Body = buf.toString('utf-8');

	const stations = scrapStations(utf8Body);
	return stations;
};

const getAllStations = async () =>
	await Promise.all(
		ZONES.map(async zone => {
			return {
				zone: zone,
				stations: await getStations(zone),
			};
		})
	);

export default { getAllStations };
