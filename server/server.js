const configuration = require('./configuration.js')
const express = require('express')
// const helmet = require("helmet")
const dbConnection = require('./dbMongo/dbConnection.js')
const router = require('./app/rooter.js')

const app = express()
// app.use(helmet())

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
