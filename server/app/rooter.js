const configuration = require('../configuration.js')
var express = require('express')
const bodyParser = require('body-parser')
const filmHandler = require('./res/filmHandler.js')
const auth = require('./res/authentication.js')
const security = require('./middlewares/security.js')
const logger = require('./middlewares/logger.js')

try {
    logger.removeOldLog()
} catch(err) {
    console.log('err: '+err)
}

var router = express.Router()

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.use('/public', logger.log, express.static(configuration.PUBLIC_PATH))
router.use('/video', security.decodeToken, logger.log, express.static(configuration.VIDEO_PATH))

// Vue
router.get('/', logger.log, (req, res) => res.sendFile(configuration.PROJECT_PATH+'/dist/index.html'))
router.get('/index.js', logger.log, (req, res) => res.sendFile(configuration.PROJECT_PATH+'/dist/index.js'))

// authentication.js
router.post('/login', auth.login)
router.get('/getNewToken', [ security.decodeToken, auth.getNewToken ])

// filmHandler.js
router.get('/films', [ security.decodeToken, filmHandler.getFilms ])
router.get('/filmsbydate', [ security.decodeToken, filmHandler.getFilmsByDate ])
router.get('/filmsbyabc', [ security.decodeToken, filmHandler.getFilmsByAbc ])

// catch 404
router.use(logger.log, (req, res) => res.status(404).send("Not found."))

module.exports = router