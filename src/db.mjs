import sqlite from 'sqlite3'

class DBManager {

	constructor(path) {
		this.db = new sqlite.Database(path)

		this.initDB()
	}

	initDB() {

	}

}

export default DBManager
