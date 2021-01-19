const application = require('./app')
const http = require('http')
const config = require('./utils/config')
const serverLogger = require('./utils/logger')

const server = http.createServer(application)

application.listen(config.PORT, () => {
  serverLogger.info(`Server running on port ${config.PORT}`)
})