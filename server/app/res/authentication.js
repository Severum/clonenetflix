const userModel = require('../../dbMongo/models/user.js')
const jwt = require('jsonwebtoken')
const logger = require('../middlewares/logger')
// const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            let user = await userModel.findOne({ name: req.body.login }, {}).exec()
            if (user) {
                // let authSuccess = await bcrypt.compare(req.body.password, user.password)
                // if (authSuccess) {
                if (user.password == req.body.password) {
                    let token = jwt.sign({ userId: user._id, name: user.name }, 'secret', { expiresIn: 60 * 6 }) // 6 min valid token
                    logger.writeLog(req, { status: 200, body: token })
                    res.status(200).send(token)
                } else {
                    // wrong password
                    logger.writeLog(req, { status: 400, body: '400: wrong login or password' })
                    res.status(400).send('400: wrong login or password')
                }
            } else {
                // login don't exist
                logger.writeLog(req, { status: 400, body: '400: wrong login or password' })
                res.status(400).send('400: wrong login or password')
            }
        } catch(err) {
            logger.writeLogErr(err, req, { status: 400, body: '400: wrong login or password' })
            res.status(400).send('400: wrong login or password')
        }
    },
    getNewToken: async (req, res) => {
        try {
            let token = jwt.sign({ userId: req.user._id, name: req.user.name }, 'secret', { expiresIn: 60 * 60 * 24 }) // 6 min valid token
            logger.writeLog(req, { status: 200, body: token })
            res.status(200).send(token)
        } catch(err) {
            logger.writeLogErr(err, req, { status: 401, body: '401: Bad token' })
            res.status(401).send('401: Bad token')
        }
    }
}