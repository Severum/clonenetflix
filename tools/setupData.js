const mongoose = require('mongoose')
// const fs = require('fs')
// const youtubedl = require('youtube-dl')

const config = require('../server/configuration.js')
const userModel = require('../server/dbMongo/models/user.js')
const usersData = require('../datas/mongo/users.json')
const filmModel = require('../server/dbMongo/models/film.js')
const filmsData = require('../datas/mongo/films.json')

// const youtubeUrlRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

function dbConnection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbMongo.URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      resolve()
    })
    .catch((err) => {
      console.log('Error on start: ' + err.message)
      reject(err)
    })

    mongoose.connection.on('error', function (err) {
      throw err
    })

    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('tools setupData disconnected process end')
        process.exit(0)
      })
    })
  })
}

// function downloadVideo(film) {
//   return new Promise(async (resolve, reject) => {
//     if (!youtubeUrlRegex.test(film.ytlink)) {
//       console.log("film.ytlink: "+film.ytlink)
//       reject(new Error('not Youtube url'))
//     }
//     try {
//       const video = youtubedl(film.ytlink)
//       video.pipe(fs.createWriteStream(config.VIDEO_PATH+film.src))
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

function dropCollections() {
  return new Promise(async (resolve, reject) => {
    console.log(`drop db ${config.dbMongo.URL}`)
    try {
      await mongoose.connection.db.dropDatabase()
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

async function populateCollection(Model, jsonData) {
  console.log("populate "+Model.modelName)
  return new Promise(async (resolve, reject) => {
    try {
      await Model.insertMany(jsonData)
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

async function run() {
  try {
    await dbConnection()
    await dropCollections()
    await populateCollection(userModel, usersData)
    await populateCollection(filmModel, filmsData)
    // console.log("filmData: "+filmsData.length)
    // for (let i = 0; i<filmsData.length; i++) {
    //   console.log("film: "+filmsData[i])
    //   await downloadVideo(filmsData[i])
    // }
    // process.exit(0)
  } catch (err) {
    console.log("err: "+err)
    throw err
  }
}

run()