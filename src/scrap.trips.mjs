import request from 'request-promise-native';
import cheerio from 'cheerio';
import iconv from 'iconv';

import ZONES from '../static/zones.json';

import fs from 'fs';

const BASE_STATIONS_URL =
	'http://horarios.renfe.com/cer/hjcer300.jsp?CP=NO&I=s&NUCLEO=';
const BASE_TRIP_URL = 'http://horarios.renfe.com/cer/hjcer310.jsp?';

const zoneStationURL = id => `${BASE_STATIONS_URL}${id}`;
