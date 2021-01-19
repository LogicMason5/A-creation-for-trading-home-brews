const infoLogger = require('./logger')

const requestLogger = (request: { method: any; path: any; body: any }, _response: any, next: () => void) => {
  infoLogger.info('Method:', request.method)
  infoLogger.info('Path:  ', request.path)
  infoLogger.info('Body:  ', request.body)
  infoLogger.info('---')
  next()
}



const tokenExtractor = (request: { token: any }, _response: any, next: () => void) => {

  const getTokenFrom = (request: { token?: any; get?: any }) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  request.token = getTokenFrom(request)

  next()
}


const unknownEndpoint = (_request: any, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): void; new(): any } } }) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: { name: string; message: any }, _request: any, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): any; new(): any }; json: { (arg0: { error: any }): any; new(): any } } }, next: (arg0: any) => void) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}