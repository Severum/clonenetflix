const filmModel = require('../../dbMongo/models/film.js')
const logger = require('../middlewares/logger.js')

module.exports = {
    getFilms: async (req, res) => {
        try {
            var result = await filmModel.find({}, ['_id', 'name', 'thumbnail', 'src', 'date']).exec()
            logger.writeLog(req, { status: 200, body: result })
            res.json(result)
        } catch(err) {
            logger.writeLogErr(req, err)
            res.status(500).send('500: Internal Server Error')
        }
    },
    getFilmsByDate: async (req, res) => {
        try {
            var result = await filmModel.find({}, ['_id', 'name', 'thumbnail', 'src', 'date'], { sort:{ date: 1 } }).exec()
            logger.writeLog(req, { status: 200, body: result })
            res.json(result)
        } catch(err) {
            logger.writeLogErr(req, err)
            res.status(500).send('500: Internal Server Error')
        }
    },
    getFilmsByAbc: async (req, res) => {
        try {
            var result = await filmModel.find({}, ['_id', 'name', 'thumbnail', 'src', 'date'], { sort:{ name: 1 } }).exec()
            logger.writeLog(req, { status: 200, body: result })
            res.json(result)
        } catch(err) {
            logger.writeLogErr(req, err)
            res.status(500).send('500: Internal Server Error')
        }
    }
}

