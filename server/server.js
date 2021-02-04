const configuration = require('./configuration.js')
const express = require('express')
var dbConnection = require('./dbMongo/dbConnection.js')
var router = require('./app/rooter.js')


// console.log('\x1b[37m%s\x1b[0m', "I Am Using Yellow")


const app = express()

app.use(router)

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1)
})

dbConnection().then(() => {
  app.listen(configuration.express.PORT, () => console.log(`I'm listening on port ${configuration.express.PORT}!    http://localhost:3000`))
}, (err) => {
  console.log("error during dbConnection: "+err.message)
})
