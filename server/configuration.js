const env = process.env.NODE_ENV || 'development'
const localConfig = require('./configuration.local.js')

const development = {
  ENV: env,
  PROJECT_PATH: localConfig.PROJECT_LOCAL_PATH,
  VIDEO_PATH: localConfig.PROJECT_LOCAL_PATH+"/datas/videos/",
  PUBLIC_PATH: localConfig.PROJECT_LOCAL_PATH+"/vue/public/",
  LOG_PATH: localConfig.PROJECT_LOCAL_PATH+"/server/log/",
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
  LOG_PATH: localConfig.PROJECT_LOCAL_PATH+"/server/log/",
  PROJECT_PATH: __dirname,
  VIDEO_PATH: "",
  PUBLIC_PATH: __dirname+"/vue/public/",
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
