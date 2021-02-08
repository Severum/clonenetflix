const fs = require('fs')
const util = require('util')

// console.log('\x1b[37m%s\x1b[0m', "I Am Using Yellow")

const configuration = require('../../configuration.js')

function _logReq(req) {
    let toLog = "---------------"+"\n"
    toLog += "date: " + new Date() +"\n"
    toLog += "request: " + req.method + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift()+"\n"
    if (req.query.token) {
        if (req.user) {
            toLog += "user: "+JSON.stringify(req.user,null,2)+"\n"
        } else {
            toLog += "user not decode\n"
        }
    } else {
        toLog += "No auth\n"
    }
    if (Object.keys(req.body).length !== 0) {
        toLog += "body: "+JSON.stringify(req.body,null,2)+"\n"
    }
    if (Object.keys(req.params).length !== 0) {
        toLog += "params: "+JSON.stringify(req.params,null,2)+"\n"
    }
    if (Object.keys(req.query).length !== 0) {
        toLog += "query: "+JSON.stringify(req.query,null,2)+"\n"
    }
    return toLog
}

function _logRes(res) {
    let toLog = "response: " + res.status + "\n"
    if (res.body) {
        toLog += "body: "+ JSON.stringify(res.body,null,2) + "\n"
    }
    return toLog
}

module.exports = {
    removeOldLog: () => {
        return new Promise( async (resolve, reject) => {
            const unlink = await util.promisify(fs.unlink)
            try {
                await unlink(configuration.PROJECT_PATH+'/server/log/log.local.txt')
                return resolve()
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    log: async (req, res, next) => {
        if (configuration.ENV == "development") {
            try { 
                // try const fs = require('fs/promises')
                const appendFile = util.promisify(fs.appendFile)
                const writeFile = util.promisify(fs.writeFile)
                if (fs.existsSync(configuration.PROJECT_PATH+'/server/log/log.local.txt')) {
                    await appendFile(configuration.PROJECT_PATH+'/server/log/log.local.txt', _logReq(req))
                    return next()
                } else {
                    await writeFile(configuration.PROJECT_PATH+'/server/log/log.local.txt', _logReq(req))
                    return next()
                }
            } catch (err) {
                console.log(err.message)
                return next(err)
            }
        } else {
            // TODO production logger
            return next()
        }        
    },
    writeLog: async (req, res) => {        
        if (configuration.ENV == "development") {
            try { 
                // try const fs = require('fs/promises')
                const appendFile = util.promisify(fs.appendFile)
                const writeFile = util.promisify(fs.writeFile)
                if (fs.existsSync(configuration.PROJECT_PATH+'/server/log/log.local.txt')) {
                    await appendFile(configuration.PROJECT_PATH+'/server/log/log.local.txt', _logReq(req)+_logRes(res))
                } else {
                    await writeFile(configuration.PROJECT_PATH+'/server/log/log.local.txt', _logReq(req)+_logRes(res))
                }
            } catch (err) {
                console.log(err.message)
                throw err
            }
        } else {
            // TODO production logger
        }
    },
    // http error 
    writeLogErr: (err, req, res) => {
        if (req) {
            console.log(_logReq(req))
        }
        if (res) {
            console.log(_logRes(res))
        }
        console.log('err: '+err.message)
    }
}