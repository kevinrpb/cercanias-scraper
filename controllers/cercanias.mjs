import moment from 'moment-timezone'

const zones = (req, res) => {}

const stations = (req, res) => {
	const { zone } = req.params
}

const trips = (req, res) => {
	const { zone, origin, destination } = req.params
}

export default { zones, stations, trips }
