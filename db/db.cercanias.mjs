import request from 'request'
import cheerio from 'cheerio'
import sqlite3 from 'sqlite3'

const init = callback => {
	let db = new (sqlite3.verbose()).Database('renfe.sqlite')

	db.serialize(() => {
		db.run('CREATE TABLE IF NOT EXISTS cercanias_zones (id ID)')
		callback(db)
	})

	return db
}

const update = (db, value) => {
	const statement = db.prepare('INSERT INTO cercanias VALUES (?)')
	statement.run(value)
	statement.finalize()
}

const read = db => {
	db.each('SELECT rowid AS id, name FROM data', (err, row) => {
		console.log(`${row.id}: ${row.name}`)
	})
}

export default { init, read, update }
