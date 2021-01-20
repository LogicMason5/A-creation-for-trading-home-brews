export {}
import { Request, Response, NextFunction } from 'express'
const logger = require('./logger')

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

interface RequestWithUser extends Request {
  token: string | null;
}



const tokenExtractor = (request: RequestWithUser, _response: Response, next: NextFunction) => {

  const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  request.token = getTokenFrom(request)

  next()
}

const unknownEndpoint = (_request: Request, response: Response, _next: NextFunction) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'CastError'
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
  return response.status(350).json({
    error: 'unknown error'
  })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}