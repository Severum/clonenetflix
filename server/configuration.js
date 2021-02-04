const env = process.env.NODE_ENV || 'development'
const localConfig = require('./configuration.local.js')

const development = {
  ENV: env,
  PROJECT_PATH: localConfig.PROJECT_LOCAL_PATH,
  VIDEO_PATH: localConfig.PROJECT_LOCAL_PATH+"/datas/video/",
  PUBLIC_PATH: localConfig.PROJECT_LOCAL_PATH+"/vue/public/",
  express: {
    PORT:3000
  },
  dbMongo: {
    URL:"mongodb://localhost/appweb"
  },
  vue: {
    URL:"http://localhost:3000"
  }
}
const production = {
  ENV: env,
  PROJECT_PATH: localConfig.PROJECT_LOCAL_PATH,
  VIDEO_PATH: "",
  PUBLIC_PATH: localConfig.PROJECT_LOCAL_PATH+"/vue/public/",
  express: {
    PORT:3000
  },
  dbMongo: {
    URL:"mongodb://localhost/appweb"
  },
  vue: {
    URL:"http://localhost:3000"
  }
}

const config = {
  development,
  production
}

module.exports = config[env]
