var config = require('../configuration.js')
var mongoose = require('mongoose')

module.exports = function () {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbMongo.URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log("Db connect")
      resolve()
    })
    .catch((err) => {
      console.log("can't connect DB: " + err.message)
      reject(err)
    })

    mongoose.connection.on('error', function(err) {
      console.error(err, 'dbConnection event error')
    })

    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('dbConnection event SIGINT')
        process.exit(0)
      })
    })
  })
}
