import express from 'express'

const zonesHandle = function(req, res) {
	console.log(res.db)
}

const router = express.Router()
router.get('/', zonesHandle)

export default router
