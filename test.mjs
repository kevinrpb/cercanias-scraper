import { getAllTrips, getDateTrips, getZoneDateTrips, getTrips } from './src/scrap.trips.mjs'

getZoneDateTrips('10', '20200117')
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })

