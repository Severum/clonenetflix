var jwt = require('jsonwebtoken')
const logger = require('../middlewares/logger.js')

module.exports = {
    decodeToken: async (req, res, next) => {
        try {
            if (req.query.token) {
                req.user = jwt.verify(req.query.token, 'secret')
                next()
            } else {
                logger.writeLog(req, { status: 401, body: '401: Unauthorized' })
                return res.status(401).send('401: Unauthorized')
            }
        } catch(err) {
            logger.writeLog(req, { status: 401, body: '401: Unauthorized' })
            return res.status(401).send('401: Unauthorized')
        }
    }
}