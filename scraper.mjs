import request from 'request'
import cheerio from 'cheerio'
import sqlite3 from 'sqlite3'

const initDatabase = callback => {
	let db = new (sqlite3.verbose()).Database('renfe.sqlite')

	db.serialize(() => {
		db.run('CREATE TABLE IF NOT EXISTS cercanias_zones (id ID)')
		callback(db)
	})
}

const updateRow = (db, value) => {
	const statement = db.prepare('INSERT INTO cercanias VALUES (?)')
	statement.run(value)
	statement.finalize()
}

const readRows = db => {
	db.each('SELECT rowid AS id, name FROM data', (err, row) => {
		console.log(`${row.id}: ${row.name}`)
	})
}

const fetchPage = (url, callback) => {
	request(url, (error, response, body) => {
		if (error) {
			console.log(`Error requesting page: ${error}`)
			return
		}

		callback(body)
	})
}

const run = db =>
	fetchPage('', body => {
		const $ = cheerio.load(body)

		let elements = $('div.media-body span.p-name').each(function() {
			let value = $(this)
				.text()
				.trim()
			updateRow(db, value)
		})

		readRows(db)

		db.close()
	})

initDatabase(run)
