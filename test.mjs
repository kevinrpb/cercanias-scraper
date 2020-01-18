import { ZONES, STATIONS, getAllStations, getAllTrips, getDateTrips, getZoneDateTrips, getTrips } from './index.mjs'

const zone        = '10'       // Madrid
const origin      = '10203'    // El Escorial
const destination = '18003'    // Méndez Álvaro
const date        = '20200120' // 2020-01-20

getTrips({ zone, origin, destination }, date)
  .then(data => {
    // console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
