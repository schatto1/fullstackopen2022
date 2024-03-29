const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('./config.js')

const { Session } = require('../models')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors[0].message })
  }

  if (error.name === 'TypeError') {
    return response.status(404).send({ error: 'resource does not exist' })
  }

  if (error.status === 400) {
    return response.status(400).send({ error: 'something is missing in the request' })
  }

  if (error.status === 404) {
    return response.status(404).send({ error: 'could not find the resource' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {

      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

      const session = await Session.findOne({
        where: {
          token: authorization.substring(7)
        }
      })

      if (!session) {
        return res.status(401).json({
          error: 'invalid session'
        })
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }